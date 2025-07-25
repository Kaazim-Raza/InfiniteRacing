from sqlalchemy import Column, Integer, String, Date, Enum as SqlEnum
from app.core.database import Base
from enum import Enum

class RoleEnum(str, Enum):
    admin = "admin"
    manager = "manager"
    vice_manager = "vice_manager"
    runner = "runner"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(SqlEnum(RoleEnum), default=RoleEnum.runner)

    # Optional fields for manager/runner profiles (can be split later if needed)
    dob = Column(Date, nullable=True)
    phone = Column(String, nullable=True)
    street = Column(String, nullable=True)
    city = Column(String, nullable=True)
    state = Column(String, nullable=True)
    zip_code = Column(String, nullable=True)
    emergency_contact_name = Column(String, nullable=True)
    emergency_contact_phone = Column(String, nullable=True)

    # Manager-specific
    team_name = Column(String, nullable=True)
    coaching_experience = Column(String, nullable=True)
    specialization = Column(String, nullable=True)
    bio = Column(String, nullable=True)

    # Runner-specific
    gender = Column(String, nullable=True)
    preferred_distance = Column(String, nullable=True)
    years_of_experience = Column(String, nullable=True)
    personal_best_5k = Column(String, nullable=True)
    personal_best_10k = Column(String, nullable=True)
