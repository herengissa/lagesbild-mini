from pydantic import BaseModel

class CaseCreate(BaseModel):
    name: str
    phone: str
    type: str
    description: str

class CaseOut(CaseCreate):
    id: int

    class Config:
        orm_mode = True
