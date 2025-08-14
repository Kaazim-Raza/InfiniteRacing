from pydantic import BaseModel
from enum import Enum

class InviteStatusEnum(str, Enum):
    pending = "pending"
    accepted = "accepted"
    declined = "declined"

class InviteOut(BaseModel):
    id: int
    runner_id: int
    manager_id: int
    status: InviteStatusEnum

    class Config:
        orm_mode = True
