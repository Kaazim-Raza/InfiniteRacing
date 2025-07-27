from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.race import Race
from app.models.user import User, RoleEnum
from app.schemas.race import RaceCreate, RaceOut
from app.schemas.user import UserCreate, UserOut, UserUpdate
from app.core.security import get_password_hash
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ------------------- RACE ENDPOINTS ---------------------

@router.post("/races/", response_model=RaceOut)
def create_race(race: RaceCreate, db: Session = Depends(get_db)):
    db_race = Race(**race.dict())
    db.add(db_race)
    db.commit()
    db.refresh(db_race)
    return db_race

@router.get("/races/", response_model=List[RaceOut])
def list_races(db: Session = Depends(get_db)):
    return db.query(Race).all()

# ------------------- USER MANAGEMENT ---------------------

@router.post("/users/", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        hashed_password=hashed_pw,
        role=user.role,
        first_name=user.first_name,
        last_name=user.last_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.put("/users/{user_id}", response_model=UserOut)
def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for field, value in user_update.dict(exclude_unset=True).items():
        setattr(user, field, value)
    db.commit()
    db.refresh(user)
    return user

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

@router.get("/users/stats/")
def get_user_stats(db: Session = Depends(get_db)):
    return {
        "total_users": db.query(User).count(),
        "admin": db.query(User).filter(User.role == RoleEnum.admin).count(),
        "manager": db.query(User).filter(User.role == RoleEnum.manager).count(),
        "vice_manager": db.query(User).filter(User.role == RoleEnum.vice_manager).count(),
        "runner": db.query(User).filter(User.role == RoleEnum.runner).count(),
    }

@router.get("/users/", response_model=List[UserOut])
def get_all_users(db: Session = Depends(get_db)):
        users = db.query(User).all()
        return users
