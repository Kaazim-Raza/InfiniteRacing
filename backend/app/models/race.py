# from sqlalchemy import Column, Integer, String, Date, Time, Boolean, Enum as SqlEnum, DateTime, Float
# from app.core.database import Base
# from enum import Enum

# class TeamType(str, Enum):
#     male = "male"
#     female = "female"
#     coed = "coed"

# class Race(Base):
#     __tablename__ = "races"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, nullable=False)
#     location = Column(String, nullable=False)
#     date = Column(Date, nullable=False)
#     time = Column(Time, nullable=False)
#     description = Column(String, nullable=True)
#     max_runners = Column(Integer, nullable=False)
#     high_school_only = Column(Boolean, default=False)
#     team_type = Column(String, nullable=True)
#     coed_min_male = Column(Integer, nullable=True)
#     coed_min_female = Column(Integer, nullable=True)
#     registration_deadline = Column(DateTime, nullable=False)
#     entry_fee = Column(Float, nullable=False)
#     # max_number_of_teams = Column(Integer, nullable=False)  # NEW FIELD
#     # number_of_teams = Column(Integer, default=0)  # Optional field for number of teams registered


from sqlalchemy import Column, Integer, String, Date, Time, Boolean, DateTime, Float
from app.core.database import Base

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
    team_type = Column(String, nullable=True)  # male/female/coed
    coed_min_male = Column(Integer, nullable=True)
    coed_min_female = Column(Integer, nullable=True)
    registration_deadline = Column(DateTime, nullable=False)
    entry_fee = Column(Float, nullable=False)

    # Optional future fields
    max_number_of_teams = Column(Integer, nullable=True)
    number_of_teams = Column(Integer, default=0)
    # This field can be used to track the number of teams
