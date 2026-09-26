import os, json
from dotenv import load_dotenv

load_dotenv()

def fallback_recommendations(event_type: str, budget: float, preferences: str, guest_count: int | None):
    if event_type == "interior":
        items = [
            {"title":"Space-saving furniture","description":"Measure your room first and compare compact, multi-purpose furniture.","estimated_price":round(budget*.35),"search_query":"space saving furniture"},
            {"title":"Lighting and decor","description":"Use layered lighting and a small number of matching decor pieces.","estimated_price":round(budget*.25),"search_query":"home lighting decor"},
            {"title":"Paint and soft furnishings","description":"Choose a cohesive palette and reserve a little budget for finishing touches.","estimated_price":round(budget*.25),"search_query":"home paint curtains cushions"}
        ]
    elif event_type == "party":
        items = [
            {"title":"Food and drinks","description":"Estimate portions using your guest count and compare catering options.","estimated_price":round(budget*.40),"search_query":"party catering"},
            {"title":"Venue and setup","description":"Compare venue packages and check what tables, chairs, and cleanup include.","estimated_price":round(budget*.30),"search_query":"party venue"},
            {"title":"Decor and cake","description":"Prioritize a few reusable decorations and confirm cake size before ordering.","estimated_price":round(budget*.20),"search_query":"party decorations cake"}
        ]
    else:
        items = [
            {"title":"Everyday or occasion jewelry","description":"Compare metal, material, weight, return policy, and certification where relevant.","estimated_price":round(budget*.45),"search_query":"jewelry"},
            {"title":"Matching accessories","description":"Choose pieces that complement the outfit and occasion without exceeding the budget.","estimated_price":round(budget*.25),"search_query":"matching jewelry accessories"},
            {"title":"Alternative styles","description":"Compare similar designs across sellers and check shipping and return costs.","estimated_price":round(budget*.20),"search_query":"affordable jewelry"}
        ]
    return {
        "summary": f"Suggested plan for {event_type} within ₹{budget:,.0f}. " + ("Guest count: " + str(guest_count) + ". " if guest_count else "") + "These are general suggestions; prices are estimates, not live listings.",
        "items": items,
        "tips": ["Compare prices and seller reviews before buying.", "Keep 10% aside for unexpected expenses.", "Check delivery, taxes, and return policies."],
        "ai_generated": False
    }

def generate_recommendations(event_type: str, budget: float, preferences: str, guest_count: int | None):
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip()
    fallback = fallback_recommendations(event_type, budget, preferences, guest_count)
    if not api_key:
        fallback["notice"] = "Gemini API key not configured; showing built-in sample suggestions."
        return fallback
    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        prompt = f'''Create practical budget recommendations for PocketSmart AI.
Return ONLY valid JSON with keys summary (string), items (array of 3 objects with title, description, estimated_price number, search_query string), tips (array of 3 strings).
Event type: {event_type}
Total budget INR: {budget}
Preferences: {preferences or "Not provided"}
Guest count: {guest_count or "Not applicable"}
Keep item estimated prices within the budget in total. Do not claim prices are live or verified.'''
        response = client.models.generate_content(model=model, contents=prompt)
        raw = (response.text or "").strip()
        raw = raw.removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        data = json.loads(raw)
        data["ai_generated"] = True
        return data
    except Exception as exc:
        fallback["notice"] = f"Gemini request failed; showing sample suggestions. Details: {str(exc)[:300]}"
        return fallback
