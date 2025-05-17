from fastapi import APIRouter, Depends
from app.utils.auth import role_required

router = APIRouter()

@router.post("/add")
def add_event(payload=Depends(role_required("root"))):
    return {"msg": "Event added by root user"}

@router.get("/list")
def list_events(payload=Depends(role_required(["admin"]))):
    return {"msg": "Available events for manager"}
