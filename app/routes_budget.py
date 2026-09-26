import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import BudgetPlan, User
from app.schemas import PlanRequest
from app.security import get_current_user
from app.gemini_service import generate_recommendations

router = APIRouter(prefix="/api/budget", tags=["Budget plans"])

def make_breakdown(event_type: str, budget: float):
    templates = {
        "interior": [("Furniture",35),("Painting",20),("Lighting",15),("Decor",15),("Reserve",15)],
        "party": [("Food & Drinks",35),("Venue",25),("Decoration",15),("Cake & Extras",10),("Reserve",15)],
        "jewelry": [("Main Jewelry",60),("Matching Accessories",15),("Alterations/Care",10),("Reserve",15)]
    }
    rows = templates[event_type]
    result = {}
    remaining = round(budget, 2)
    for idx, (name, pct) in enumerate(rows):
        amount = remaining if idx == len(rows)-1 else round(budget*pct/100, 2)
        remaining = round(remaining-amount, 2)
        result[name] = {"percentage": pct, "amount": amount}
    return result

@router.post("/create")
def create_plan(data: PlanRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    breakdown = make_breakdown(data.event_type, data.budget)
    recs = generate_recommendations(data.event_type, data.budget, data.preferences, data.guest_count)
    plan = BudgetPlan(user_id=user.id, event_type=data.event_type, budget=data.budget,
                      preferences=data.preferences, guest_count=data.guest_count,
                      breakdown=json.dumps(breakdown, ensure_ascii=False),
                      recommendations=json.dumps(recs, ensure_ascii=False))
    db.add(plan); db.commit(); db.refresh(plan)
    return {"message":"Budget plan created successfully","plan_id":plan.id,"event_type":data.event_type,
            "total_budget":data.budget,"breakdown":breakdown,"recommendations":recs}

@router.get("/my-plans")
def my_plans(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    plans = db.query(BudgetPlan).filter(BudgetPlan.user_id==user.id).order_by(BudgetPlan.id.desc()).all()
    return {"total_plans":len(plans),"plans":[{"id":p.id,"event_type":p.event_type,"budget":p.budget,
        "preferences":p.preferences,"guest_count":p.guest_count,"breakdown":json.loads(p.breakdown),
        "recommendations":json.loads(p.recommendations),"created_at":p.created_at.isoformat() if p.created_at else None} for p in plans]}

@router.delete("/{plan_id}")
def delete_plan(plan_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    plan = db.query(BudgetPlan).filter(BudgetPlan.id==plan_id, BudgetPlan.user_id==user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Budget plan not found.")
    db.delete(plan); db.commit()
    return {"message":"Budget plan deleted successfully"}
