from pydantic import BaseModel
from datetime import date, time

class EventCreate(BaseModel):
    name: str
    date: date
    time: time
    venue: str
    description: str
    created_at: date
