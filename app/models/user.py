from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    admin_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # <- New field

    admin = relationship("User", remote_side=[id], backref="team_members")  # Self-referencing

