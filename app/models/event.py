from sqlalchemy import Column, Integer, String, Date, Time
from app.database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    venue = Column(String, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(Date, nullable=False)