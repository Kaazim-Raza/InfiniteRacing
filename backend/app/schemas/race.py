from pydantic import BaseModel
from datetime import date, time, datetime
from enum import Enum
from typing import Optional

class TeamType(str, Enum):
    male = "male"
    female = "female"
    coed = "coed"

class RaceBase(BaseModel):
    name: str
    location: str
    date: date
    time: time
    description: Optional[str]
    max_runners: int
    high_school_only: bool
    team_type: TeamType
    coed_min_male: Optional[int]
    coed_min_female: Optional[int]
    registration_deadline: datetime
    entry_fee: float

class RaceCreate(RaceBase):
    pass

class RaceOut(RaceBase):
    id: int

    class Config:
        orm_mode = True
