from fastapi import FastAPI
from app.routers import users, event_updates, team_view, dashboard , auth
import logging

app = FastAPI()

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(event_updates.router, prefix="/events", tags=["Events"])
app.include_router(team_view.router, prefix="/teams", tags=["Teams"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])

@app.on_event("startup")
def init_db():
    try:
        from app.database import create_database
        create_database()
        logging.info("✅ Database initialized.")
    except Exception as e:
        logging.error(f"❌ Failed to initialize DB: {e}")
