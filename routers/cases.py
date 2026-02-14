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
    
    # Auto-logg när ärendet skapas
    log = models.CaseLog(
        message=f"Ärende skapades: {db_case.type} - {db_case.description}",
        case_id=db_case.id,
        user_id=2
    )
    db.add(log)
    db.commit()
    return db_case


@router.get("/", response_model=list[schemas.CaseOut])
def get_cases(db: Session = Depends(get_db)):
    return db.query(models.Case).all()


@router.put("/{case_id}", response_model=schemas.CaseOut)
def update_case(case_id: int, updated: schemas.CaseUpdate, db: Session = Depends(get_db)):
    case = db.query(models.Case).filter(models.Case.id == case_id).first()
    if not case:
        return {"detail": "Case not found"}

    for key, value in updated.model_dump(exclude_unset=True).items():
        setattr(case, key, value)

    db.commit()
    db.refresh(case)

    # Auto-logg (använd user_id=1 tills du har auth)
    log = models.CaseLog(
        message=f"Ärende uppdaterades: {updated.model_dump(exclude_unset=True)}",
        case_id=case.id,
        user_id=2
    )
    db.add(log)
    db.commit()

    return case