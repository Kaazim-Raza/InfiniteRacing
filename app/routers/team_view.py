from fastapi import APIRouter, Depends
from app.utils.auth import role_required

router = APIRouter()

@router.get("/players")
def get_players(payload=Depends(role_required("admin"))):
    return {"msg": "List of players for this manager"}
