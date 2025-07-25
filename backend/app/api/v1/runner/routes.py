from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.user import User, RoleEnum
from app.schemas.user import UserOut, UserUpdate
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/team/", response_model=List[UserOut])
def view_teammates(runner_id: int, db: Session = Depends(get_db)):
    runner = db.query(User).filter(User.id == runner_id, User.role == RoleEnum.runner).first()
    if not runner:
        raise HTTPException(status_code=403, detail="Runner not found or unauthorized")

    if not runner.team_name:
        return []

    return db.query(User).filter(
        User.role == RoleEnum.runner,
        User.team_name == runner.team_name,
        User.id != runner.id
    ).all()

@router.put("/profile/", response_model=UserOut)
def update_runner_profile(runner_id: int, updates: UserUpdate, db: Session = Depends(get_db)):
    runner = db.query(User).get(runner_id)
    if not runner or runner.role != RoleEnum.runner:
        raise HTTPException(status_code=403, detail="Unauthorized")

    for field, value in updates.dict(exclude_unset=True).items():
        setattr(runner, field, value)

    db.commit()
    db.refresh(runner)
    return runner
