from fastapi import APIRouter, Depends,  HTTPException, status
from app.utils.auth import role_required
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.team_invite import TeamInvite, InviteStatus

router = APIRouter()

@router.get("/profile")
def view_profile(payload=Depends(role_required(["root", "admin", "viewer"]))):
    return {"msg": f"Welcome {payload['role']}"}

# @router.get("/manage-users")
# def root_manage_users(payload=Depends(role_required("root"))):
#     return {"msg": "Root user managing all users"}

@router.get("/manage-users")
def root_manage_users(
    payload=Depends(role_required(["root"])),
    db: Session = Depends(get_db)
):
    users = db.query(User).all()
    return [{"id": user.id, "username": user.username, "role": user.role} for user in users]

@router.delete("/manage-users/{user_id}")
def delete_user(
    user_id: int,
    payload=Depends(role_required(["root"])),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.role == "root":
        raise HTTPException(status_code=403, detail="Cannot delete a root user")

    db.delete(user)
    db.commit()
    return {"msg": f"User '{user.username}' deleted successfully"}


@router.post("/send-invite")
def admin_send_invite(
    viewer_username: str,
    payload=Depends(role_required(["admin"])),
    db: Session = Depends(get_db)
):
    viewer = db.query(User).filter_by(username=viewer_username, role="viewer").first()
    if not viewer:
        raise HTTPException(status_code=404, detail="Viewer not found")

    # Prevent duplicate pending invite
    print("Payload", payload)
    existing = db.query(TeamInvite).filter_by(
        admin_id=payload["id"], viewer_id=viewer.id, status=InviteStatus.pending
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Pending invite already exists")

    invite = TeamInvite(admin_id=payload["id"], viewer_id=viewer.id)
    db.add(invite)
    db.commit()
    return {"msg": "Invite sent"}

@router.get("/my-team")
def admin_view_team(payload=Depends(role_required("admin"))):
    return {"msg": "Team overview for manager"}

@router.get("/my-invites")
def get_my_invites(
    payload=Depends(role_required(["viewer"])),
    db: Session = Depends(get_db)
):
    invites = db.query(TeamInvite).filter_by(viewer_id=payload["id"]).all()
    return [
        {"id": i.id, "from_admin": i.admin.username, "status": i.status}
        for i in invites
    ]
    
@router.post("/respond-invite")
def respond_invite(
    invite_id: int,
    response: str,  # should be "accept" or "reject"
    payload=Depends(role_required(["viewer"])),
    db: Session = Depends(get_db)
):
    invite = db.query(TeamInvite).filter_by(id=invite_id, viewer_id=payload["id"]).first()
    if not invite:
        raise HTTPException(status_code=404, detail="Invite not found")

    if response not in ["accept", "reject"]:
        raise HTTPException(status_code=400, detail="Invalid response")

    invite.status = InviteStatus.accepted if response == "accept" else InviteStatus.rejected
    db.commit()
    return {"msg": f"Invite {response}ed"}

