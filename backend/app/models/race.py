from sqlalchemy import Column, Integer, String, Date, Time, Boolean, Enum as SqlEnum, DateTime, Float
from app.core.database import Base
from enum import Enum

class TeamType(str, Enum):
    male = "male"
    female = "female"
    coed = "coed"

class Race(Base):
    __tablename__ = "races"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    description = Column(String, nullable=True)
    max_runners = Column(Integer, nullable=False)
    high_school_only = Column(Boolean, default=False)
