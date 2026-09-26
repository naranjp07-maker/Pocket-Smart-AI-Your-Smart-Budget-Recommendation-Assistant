from pydantic import BaseModel, EmailStr, Field
from typing import Literal

class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class PlanRequest(BaseModel):
    event_type: Literal["interior", "party", "jewelry"]
    budget: float = Field(gt=0, le=100000000)
    preferences: str = Field(default="", max_length=2000)
    guest_count: int | None = Field(default=None, ge=1, le=100000)
