from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.user import User, RoleEnum
from app.schemas.user import UserOut, UserUpdate
from typing import List
from app.models.invite import RunnerInvite, InviteStatus  
from app.schemas.user import ChangePasswordRequest
from app.schemas.invite import InviteOut  # <-- You should have a schema for invites
from app.core.security import get_password_hash, verify_password

# Add this schema to app/schemas/user.py:



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

@router.get("/manager/", response_model=UserOut)
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


@router.post("/{invite_id}/respond")
def respond_to_invite(invite_id: int, action: str, runner_id: int, db: Session = Depends(get_db)):
    invite = db.query(RunnerInvite).filter(RunnerInvite.id == invite_id).first()
    if not invite:
        raise HTTPException(status_code=404, detail="Invite not found")

    if invite.runner_id != runner_id:
        raise HTTPException(status_code=403, detail="You cannot respond to someone else's invite")

    if invite.status != InviteStatus.pending:
        raise HTTPException(status_code=400, detail="Invite already responded to")

    if action not in ["accept", "decline"]:
        raise HTTPException(status_code=400, detail="Invalid action")

    if action == "accept":
        invite.status = InviteStatus.accepted
        runner = db.query(User).filter(User.id == runner_id).first()
        runner.team_name = invite.manager.team_name  # Add runner to manager's team
    else:
        invite.status = InviteStatus.declined

    db.commit()
    return {"message": f"Invite {invite.status}"}


@router.get("/invites/", response_model=List[InviteOut])
def get_runner_invites(runner_id: int, db: Session = Depends(get_db)):
    """Fetch all invites for a given runner."""
    invites = db.query(RunnerInvite).filter(RunnerInvite.runner_id == runner_id).all()
    return invites


@router.patch("/profile/", response_model=UserOut)
def patch_runner_profile(runner_id: int, updates: UserUpdate, db: Session = Depends(get_db)):
    runner = db.query(User).get(runner_id)
    if not runner or runner.role != RoleEnum.runner:
        raise HTTPException(status_code=403, detail="Unauthorized")

    for field, value in updates.dict(exclude_unset=True).items():
        if value != "":  # ignore empty strings so they don't overwrite existing values
            setattr(runner, field, value)

    db.commit()
    db.refresh(runner)
    return runner  # ✅ return the updated object


@router.get("/my-manager/", response_model=UserOut)
def get_my_manager(runner_id: int, db: Session = Depends(get_db)):
    runner = db.query(User).filter(User.id == runner_id, User.role == RoleEnum.runner).first()
    if not runner:
        raise HTTPException(status_code=404, detail="Runner not found")
    if not runner.team_name:
        raise HTTPException(status_code=404, detail="Runner is not assigned to any team")
    
    print(f"Runner's team: '{runner.team_name}'")  # Debug

    manager = db.query(User).filter(
        User.role.in_([RoleEnum.manager, RoleEnum.vice_manager]),
        User.team_name == runner.team_name
    ).first()

    if not manager:
        raise HTTPException(status_code=404, detail=f"Manager not found for team '{runner.team_name}'")
    
    return manager

# @router.post("/change-password/")
# def change_runner_password(runner_id: int, data: ChangePasswordRequest, db: Session = Depends(get_db)):
#         runner = db.query(User).filter(User.id == runner_id, User.role == RoleEnum.runner).first()
#         if not runner:
#             raise HTTPException(status_code=404, detail="Runner not found")

#         if not verify_password(data.old_password):
#             raise HTTPException(status_code=400, detail="Old password is incorrect")

#         runner.set_password(data.new_password)
#         db.commit()
#         return {"message": "Password updated successfully"}