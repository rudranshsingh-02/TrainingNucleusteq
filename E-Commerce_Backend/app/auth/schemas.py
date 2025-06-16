from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "user"

class UserRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    model_config = ConfigDict(from_attributes=True) 

class UserLogin(BaseModel):
    email: EmailStr
    password: str
