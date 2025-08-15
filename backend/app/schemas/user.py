from pydantic import BaseModel, EmailStr ,Field ,validator
from enum import Enum
from typing import Optional
from datetime import date


class RoleEnum(str, Enum):
    admin = "admin"
    manager = "manager"
    vice_manager = "vice_manager"
    runner = "runner"

class UserBase(BaseModel):
    email: EmailStr
    role: RoleEnum

class UserCreate(UserBase):
    password: str
    first_name: Optional[str]
    last_name: Optional[str]

# class UserUpdate(BaseModel):
#     first_name: Optional[str] 
#     last_name: Optional[str]
#     dob: Optional[str]
#     phone: Optional[str]
#     street: Optional[str]
#     city: Optional[str]
#     state: Optional[str]
#     zip_code: Optional[str]
#     emergency_contact_name: Optional[str]
#     emergency_contact_phone: Optional[str]
#     team_name: Optional[str]
#     coaching_experience: Optional[str]
#     specialization: Optional[str]
#     bio: Optional[str]
#     gender: Optional[str]
#     preferred_distance: Optional[str]
#     years_of_experience: Optional[str]
#     personal_best_5k: Optional[str]
#     personal_best_10k: Optional[str]

class UserOut(UserBase):
    id: int
    first_name: Optional[str]
    last_name: Optional[str]

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    dob: Optional[date] = None
    phone: Optional[str] = None
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    team_name: Optional[str] = None
    coaching_experience: Optional[str] = None
    specialization: Optional[str] = None
    bio: Optional[str] = None
    gender: Optional[str] = None
    preferred_distance: Optional[str] = None
    years_of_experience: Optional[str] = None
    personal_best_5k: Optional[str] = None
    personal_best_10k: Optional[str] = None

    @validator("*", pre=True)
    def empty_str_to_none(cls, v):
        if isinstance(v, str) and not v.strip():
            return None
        return v
