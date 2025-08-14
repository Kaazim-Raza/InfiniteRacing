from fastapi import APIRouter, Depends, HTTPException ,Query
from sqlalchemy.orm import Session
from typing import List
from app.models.user import User, RoleEnum
from app.models.race import Race
from app.core.database import SessionLocal
from app.schemas.user import UserOut, UserUpdate
from app.utils.email_invites import parse_emails
from app.models.team import Team
from pydantic import BaseModel
from typing import List
from app.models.invite import RunnerInvite, InviteStatus
class TeamRegistrationRequest(BaseModel):
    team_name: str
    runner_ids: List[int]


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

@router.get("/registered_races/", response_model=List[str])
def get_registered_races(manager_id: int, db: Session = Depends(get_db)):
        manager = db.query(User).get(manager_id)
        if not manager or manager.role not in [RoleEnum.manager, RoleEnum.vice_manager]:
            raise HTTPException(status_code=403, detail="Unauthorized")

        # Assuming Race has a team_name field for registered teams
        races = db.query(Race).filter(Race.team_name == manager.team_name).all()
        return [race.name for race in races]





@router.get("/manager/races")
def get_manager_races(manager_id: int = Query(...), db: Session = Depends(get_db)):
    teams = db.query(Team).filter(Team.manager_id == manager_id).all()

    result = []
    for team in teams:
        race = team.race
        runners = [
            {
                "id": r.id,
                "first_name": r.first_name,
                "last_name": r.last_name,
                "gender": r.gender
            }
            for r in team.runners
        ]

        result.append({
            "race_id": race.id,
            "race_name": race.name,
            "location": race.location,
            "date": race.date,
            "team_name": team.name,
            "team_count": len(runners),
            "runners": runners
        })

    return result

@router.get("/manager/team_racers")
def get_team_racers(manager_id: int = Query(...), db: Session = Depends(get_db)):
        manager = db.query(User).get(manager_id)
        if not manager or manager.role not in [RoleEnum.manager, RoleEnum.vice_manager]:
            raise HTTPException(status_code=403, detail="Unauthorized")

        racers = db.query(User).filter(
            User.role == RoleEnum.runner,
            User.team_name == manager.team_name
        ).all()

        return [
            {
                "id": r.id,
                "first_name": r.first_name,
                "last_name": r.last_name,
                "email": r.email,
                "gender": r.gender
            }
            for r in racers
        ]


@router.post("/register/{race_id}")
def register_team_for_race(
    race_id: int,
    request: TeamRegistrationRequest,
    manager_id: int,
    db: Session = Depends(get_db)
):
    # Verify manager exists
    manager = db.query(User).filter(
        User.id == manager_id,
        User.role.in_([RoleEnum.manager, RoleEnum.vice_manager])
    ).first()
    if not manager:
        raise HTTPException(status_code=403, detail="Manager not found or unauthorized")

    # Verify race exists
    race = db.query(Race).filter(Race.id == race_id).first()
    if not race:
        raise HTTPException(status_code=404, detail="Race not found")

    # Allowed runners = manager's permanent pool + the manager themselves
    allowed_runners = db.query(User).filter(
        (User.role == RoleEnum.runner) | (User.id == manager.id),
        User.team_name == manager.team_name
    ).all()

    allowed_runner_ids = {r.id for r in allowed_runners}
    invalid_runners = [rid for rid in request.runner_ids if rid not in allowed_runner_ids]
    if invalid_runners:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid runners for this manager: {invalid_runners}"
        )

    # Create team
    team = Team(
        name=request.team_name,
        manager_id=manager.id,
        race_id=race.id
    )
    db.add(team)
    db.commit()
    db.refresh(team)

    # Link runners to team
    selected_runners = db.query(User).filter(User.id.in_(request.runner_ids)).all()
    team.runners.extend(selected_runners)
    db.commit()

    return {
        "message": f"Team '{team.name}' registered for race '{race.name}'",
        "team_id": team.id,
        "runner_count": len(selected_runners)
    }


@router.post("/send/{runner_id}")
def send_invite(runner_id: int, manager_id: int, db: Session = Depends(get_db)):
    manager = db.query(User).filter(User.id == manager_id, User.role.in_([RoleEnum.manager, RoleEnum.vice_manager])).first()
    if not manager:
        raise HTTPException(status_code=403, detail="Only managers can send invites")

    runner = db.query(User).filter(User.id == runner_id, User.role == RoleEnum.runner).first()
    if not runner:
        raise HTTPException(status_code=404, detail="Runner not found")

    # Prevent duplicate pending invites
    existing_invite = db.query(RunnerInvite).filter(
        RunnerInvite.manager_id == manager.id,
        RunnerInvite.runner_id == runner.id,
        RunnerInvite.status == InviteStatus.pending
    ).first()
    if existing_invite:
        raise HTTPException(status_code=400, detail="An invite is already pending")

    invite = RunnerInvite(manager_id=manager.id, runner_id=runner.id)
    db.add(invite)
    db.commit()
    db.refresh(invite)

    return {"message": "Invite sent", "invite_id": invite.id}

@router.post("/respond/{invite_id}")
def respond_invite(invite_id: int, runner_id: int, response: str, db: Session = Depends(get_db)):
    """
    Runner accepts or declines an invite.
    response must be 'accept' or 'decline'.
    """
    invite = db.query(RunnerInvite).filter(RunnerInvite.id == invite_id).first()
    if not invite:
        raise HTTPException(status_code=404, detail="Invite not found")

    if invite.runner_id != runner_id:
        raise HTTPException(status_code=403, detail="Not your invite")

    if invite.status != InviteStatus.pending:
        raise HTTPException(status_code=400, detail="Invite already responded to")

    if response.lower() == "accept":
        invite.status = InviteStatus.accepted
        # Optionally: assign runner to manager’s team_name
        manager = db.query(User).filter(User.id == invite.manager_id).first()
        runner = db.query(User).filter(User.id == invite.runner_id).first()
        runner.team_name = manager.team_name
    elif response.lower() == "decline":
        invite.status = InviteStatus.declined
    else:
        raise HTTPException(status_code=400, detail="Invalid response")

    db.commit()
    return {"message": f"Invite {response}ed successfully"}


@router.get("/manager/pool")
def get_manager_pool(manager_id: int = Query(...), db: Session = Depends(get_db)):
    """
    Returns all runners who have accepted this manager's invite.
    """
    manager = db.query(User).filter(User.id == manager_id, User.role.in_([RoleEnum.manager, RoleEnum.vice_manager])).first()
    if not manager:
        raise HTTPException(status_code=403, detail="Manager not found")

    runners = (
        db.query(User)
        .join(RunnerInvite, RunnerInvite.runner_id == User.id)
        .filter(
            RunnerInvite.manager_id == manager.id,
            RunnerInvite.status == InviteStatus.accepted
        )
        .all()
    )

    return [
        {
            "id": r.id,
            "first_name": r.first_name,
            "last_name": r.last_name,
            "email": r.email,
            "gender": r.gender
        }
        for r in runners
    ]
@router.get("/manager/team")
def get_manager_team(manager_id: int = Query(...), db: Session = Depends(get_db)):
    """
    Returns all runners in the manager's team.
    """
    manager = db.query(User).filter(User.id == manager_id, User.role.in_([RoleEnum.manager, RoleEnum.vice_manager])).first()
    if not manager:
        raise HTTPException(status_code=403, detail="Manager not found")
    runners = db.query(User).filter(
        User.role == RoleEnum.runner,
        User.team_name == manager.team_name
    ).all()
    return [
        {
            "id": r.id,
            "first_name": r.first_name,
            "last_name": r.last_name,
            "email": r.email,
        }]


@router.get("/manager/pending_invite_count")
def get_manager_pending_invite_count(manager_id: int = Query(...), db: Session = Depends(get_db)):
    """
    Returns the number of pending invites sent by the manager.
    """
    manager = db.query(User).filter(User.id == manager_id, User.role.in_([RoleEnum.manager, RoleEnum.vice_manager])).first()
    if not manager:
        raise HTTPException(status_code=403, detail="Manager not found")
    pending_count = db.query(RunnerInvite).filter(
        RunnerInvite.manager_id == manager.id,
        RunnerInvite.status == InviteStatus.pending
    ).count()
    return {"pending_invite_count": pending_count}