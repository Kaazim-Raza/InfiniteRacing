# models/invite.py
from sqlalchemy import Column, Integer, Enum, ForeignKey, String
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class InviteStatus(str, enum.Enum):
    pending = "pending"
    accepted = "accepted"
    declined = "declined"

class RunnerInvite(Base):
    __tablename__ = "runner_invites"

    id = Column(Integer, primary_key=True, index=True)
    manager_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    runner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    status = Column(Enum(InviteStatus), default=InviteStatus.pending)

    manager = relationship("User", foreign_keys=[manager_id])
    runner = relationship("User", foreign_keys=[runner_id])
