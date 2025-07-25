from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models.user import User, RoleEnum
from app.models.race import Race
from app.core.database import SessionLocal
from app.schemas.user import UserOut, UserUpdate
from app.utils.email_invites import parse_emails

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Simulated invite handling for now — storing runners directly under manager's team
@router.post("/invite/")
def invite_runners(emails: str, manager_id: int, db: Session = Depends(get_db)):
    email_list = parse_emails(emails)
    created = []

    manager = db.query(User).filter(User.id == manager_id, User.role.in_([RoleEnum.manager, RoleEnum.vice_manager])).first()
    if not manager:
        raise HTTPException(status_code=403, detail="Manager not found")

    for email in email_list:
        if db.query(User).filter(User.email == email).first():
            continue
        runner = User(
            email=email,
            hashed_password="",  # Invite only, runner will set later
            role=RoleEnum.runner,
            team_name=manager.team_name
        )
        db.add(runner)
        created.append(email)

    db.commit()
    return {"invited": created, "total": len(created)}

@router.get("/dashboard/")
def manager_dashboard(manager_id: int, db: Session = Depends(get_db)):
    runners = db.query(User).filter(User.role == RoleEnum.runner, User.team_name != None).all()
    team_runners = [r for r in runners if r.team_name == db.query(User).get(manager_id).team_name]

    return {
        "total_runners": len(team_runners),
        "male_runners": len([r for r in team_runners if r.gender == "male"]),
        "female_runners": len([r for r in team_runners if r.gender == "female"]),
        "pending_invites": len([r for r in team_runners if not r.hashed_password])
    }

@router.get("/runners/", response_model=List[UserOut])
def get_team_runners(manager_id: int, db: Session = Depends(get_db)):
    manager = db.query(User).get(manager_id)
    if not manager or manager.role not in [RoleEnum.manager, RoleEnum.vice_manager]:
        raise HTTPException(status_code=403, detail="Unauthorized")

    return db.query(User).filter(User.role == RoleEnum.runner, User.team_name == manager.team_name).all()

@router.post("/register/{race_id}")
def register_team(race_id: int, manager_id: int, db: Session = Depends(get_db)):
    race = db.query(Race).filter(Race.id == race_id).first()
    if not race:
        raise HTTPException(status_code=404, detail="Race not found")

    # Placeholder: assume a join table like team_race if needed
    return {"message": f"Team registered for race {race.name}"}

@router.put("/profile/", response_model=UserOut)
def update_manager_profile(manager_id: int, updates: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).get(manager_id)
    if not user or user.role not in [RoleEnum.manager, RoleEnum.vice_manager]:
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return user
