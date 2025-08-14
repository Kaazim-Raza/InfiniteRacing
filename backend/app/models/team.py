# from sqlalchemy import Column, Integer, ForeignKey, Table, String
# from sqlalchemy.orm import relationship
# from app.core.database import Base

# # Association table for runners in a team
# team_runners = Table(
#     "team_runners",
#     Base.metadata,
#     Column("team_id", ForeignKey("teams.id"), primary_key=True),
#     Column("runner_id", ForeignKey("users.id"), primary_key=True)
# )

# class Team(Base):
#     __tablename__ = "teams"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, nullable=False)  # Team name
#     manager_id = Column(Integer, ForeignKey("users.id"), nullable=False)
#     race_id = Column(Integer, ForeignKey("races.id"), nullable=False)

#     # Relationships
#     manager = relationship("User", backref="teams", foreign_keys=[manager_id])
#     race = relationship("Race", backref="teams")
#     runners = relationship("User", secondary=team_runners, backref="teams_joined")

from sqlalchemy import Column, Integer, ForeignKey, Table, String
from sqlalchemy.orm import relationship
from app.core.database import Base

team_runners = Table(
    "team_runners",
    Base.metadata,
    Column("team_id", ForeignKey("teams.id"), primary_key=True),
    Column("runner_id", ForeignKey("users.id"), primary_key=True)
)

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)  
    manager_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    race_id = Column(Integer, ForeignKey("races.id"), nullable=False)

    # Relationships
    manager = relationship("User", backref="teams", foreign_keys=[manager_id])
    race = relationship("Race", backref="teams")
    runners = relationship("User", secondary=team_runners, backref="teams_joined")
