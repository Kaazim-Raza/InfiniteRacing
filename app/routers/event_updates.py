from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.auth import role_required
from app.database import get_db
from app.schemas.event import EventCreate
from app.models.event import Event

router = APIRouter()

@router.post("/add")
def add_event(
    event: EventCreate,
    db: Session = Depends(get_db),
    payload=Depends(role_required("root"))
):
    new_event = Event(
        name=event.name,
        date=event.date,
        time=event.time,
        venue=event.venue,
        description=event.description,
        created_at=event.created_at)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return {"msg": "Event added successfully", "event": event}


@router.get("/list")
def list_events(
    db: Session = Depends(get_db),
    payload=Depends(role_required(["admin", "root"]))
):
    events = db.query(Event).all()
    return {"events": events}


@router.delete("/delete/{event_id}")
def delete_event(
    event_id: int,
    payload=Depends(role_required("root")),
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="❌ Event not found")
    db.delete(event)
    db.commit()
    return {"msg": f"🗑️ Event ID {event_id} deleted successfully"}