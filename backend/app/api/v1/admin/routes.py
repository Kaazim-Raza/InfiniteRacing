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

@router.get("/users/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.patch("/users/{user_id}", response_model=UserOut)
def partial_update_user(user_id: int, user_update: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    update_data = user_update.dict(exclude_unset=True)
    # Remove password if present
    update_data.pop("password", None)
    allowed_fields = {"first_name", "last_name", "email", "role"}
    for field in allowed_fields:
        if field in update_data:
            setattr(user, field, update_data[field])
    db.commit()
    db.refresh(user)
    return user

@router.get("/dashboard/stats/")
def get_runners_and_races_stats(db: Session = Depends(get_db)):
    runners_count = db.query(User).filter(User.role == RoleEnum.runner).count()
    races_count = db.query(Race).count()
    return {
            "runners_count": runners_count,
            "races_count": races_count}


@router.get("/users/team/{runner_id}", response_model=List[UserOut])
def view_team_members(runner_id: int, db: Session = Depends(get_db)):
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
@router.get("/users/manager/{runner_id}", response_model=UserOut)
def get_team_manager(runner_id: int, db: Session = Depends(get_db)):
    runner = db.query(User).filter(User.id == runner_id, User.role == RoleEnum.runner).first()
    if not runner:
        raise HTTPException(status_code=403, detail="Runner not found or unauthorized") 
    if not runner.team_name:
        raise HTTPException(status_code=404, detail="Runner is not assigned to any team")
    manager = db.query(User).filter(
        User.role == RoleEnum.manager,
        User.team_name == runner.team_name
    ).first()
    if not manager:
        raise HTTPException(status_code=404, detail="Manager not found for this team")
    return manager

@router.put("/users/profile/{runner_id}", response_model=UserOut)
def update_runner_profile(runner_id: int, updates: UserUpdate, db: Session = Depends(get_db)):
    runner = db.query(User).get(runner_id)
    if not runner or runner.role != RoleEnum.runner:
        raise HTTPException(status_code=403, detail="Unauthorized")
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(runner, field, value)
    db.commit()
    db.refresh(runner)
    return runner

@router.put("/races/{race_id}", response_model=RaceOut)
def update_race(race_id: int, race_update: RaceCreate, db: Session = Depends(get_db)):
        race = db.query(Race).filter(Race.id == race_id).first()
        if not race:
            raise HTTPException(status_code=404, detail="Race not found")
        for field, value in race_update.dict(exclude_unset=True).items():
            setattr(race, field, value)
        db.commit()
        db.refresh(race)
        return race

@router.get("/races/{race_id}", response_model=RaceOut)
def get_race(race_id: int, db: Session = Depends(get_db)):
            race = db.query(Race).filter(Race.id == race_id).first()
            if not race:
                raise HTTPException(status_code=404, detail="Race not found")
            return race