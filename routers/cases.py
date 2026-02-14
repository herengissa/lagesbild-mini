from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
import schemas
from database import SessionLocal

router = APIRouter(
    prefix="/cases",
    tags=["Cases"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.CaseOut)
def create_case(case: schemas.CaseCreate, db: Session = Depends(get_db)):
    db_case = models.Case(**case.model_dump())
    db.add(db_case)
    db.commit()
    db.refresh(db_case)
    return db_case


@router.get("/", response_model=list[schemas.CaseOut])
def get_cases(db: Session = Depends(get_db)):
    return db.query(models.Case).all()
