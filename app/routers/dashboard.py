from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def index():
    return {"message": "Dashboard route working"}
