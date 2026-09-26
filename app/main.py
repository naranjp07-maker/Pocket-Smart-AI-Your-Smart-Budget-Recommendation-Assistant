from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.database import Base, engine
from app.routes_auth import router as auth_router
from app.routes_budget import router as budget_router

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"
Base.metadata.create_all(bind=engine)

app = FastAPI(title="PocketSmart AI", version="1.0.0", description="Personalized budget planning and recommendations")
app.include_router(auth_router)
app.include_router(budget_router)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/")
def home():
    return FileResponse(STATIC_DIR / "index.html")

@app.get("/health")
def health():
    return {"status":"ok"}
