from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import Status, SessionLocal
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tillåt alla domäner (enkelt för utveckling)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Modell för inkommande data
class StatusItem(BaseModel):
    status: str
    plats: str
    tid: str

# Dependency för databas-session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Lägesbild Mini API med SQL är igång!"}

@app.post("/status")
def add_status(item: StatusItem, db: Session = Depends(get_db)):
    db_item = Status(status=item.status, plats=item.plats, tid=item.tid)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return {"message": "Status sparad i databasen", "data": item}

@app.get("/all")
def get_all(db: Session = Depends(get_db)):
    items = db.query(Status).all()
    return items
