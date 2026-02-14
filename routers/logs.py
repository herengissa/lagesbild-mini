from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
import schemas
from database import SessionLocal

router = APIRouter(
    prefix="/logs",
    tags=["Logs"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.CaseLogOut)
def create_log(payload: schemas.CaseLogCreate, db: Session = Depends(get_db)):
    log = models.CaseLog(**payload.model_dump())
    db.add(log)
    db.commit()
    db.refresh(log)
    return log

@router.get("/case/{case_id}", response_model=list[schemas.CaseLogOut])
def list_logs_for_case(case_id: int, db: Session = Depends(get_db)):
    return db.query(models.CaseLog).filter(models.CaseLog.case_id == case_id).all()