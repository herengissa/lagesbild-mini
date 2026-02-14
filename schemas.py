from datetime import datetime

from pydantic import BaseModel


class CaseCreate(BaseModel):
    name: str
    phone: str
    type: str
    description: str
    
class CaseUpdate(BaseModel):
    name: str | None = None
    phone: str | None = None
    type: str | None = None
    description: str | None = None


class UserOut(BaseModel):
    id: int
    username: str
    role: str

    class Config:
        from_attributes = True


class CaseStatusOut(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class CaseLogCreate(BaseModel):
    case_id: int
    user_id: int
    message: str


class CaseLogOut(BaseModel):
    id: int
    message: str
    timestamp: datetime
    user: UserOut

    class Config:
        from_attributes = True


class CaseOut(BaseModel):
    id: int
    name: str
    phone: str
    type: str
    description: str
    status: CaseStatusOut | None = None
    user: UserOut | None = None
    logs: list[CaseLogOut] = []

    class Config:
        from_attributes = True