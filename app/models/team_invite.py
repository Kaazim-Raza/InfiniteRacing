from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class InviteStatus(str, enum.Enum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"

class TeamInvite(Base):
    __tablename__ = "team_invites"

    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, ForeignKey("users.id"))
    viewer_id = Column(Integer, ForeignKey("users.id"))
    status = Column(Enum(InviteStatus), default=InviteStatus.pending)

    admin = relationship("User", foreign_keys=[admin_id], backref="sent_invites")
    viewer = relationship("User", foreign_keys=[viewer_id], backref="received_invites")
