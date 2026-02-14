from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
import models
from routers import auth, cases, health, logs, users

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tillåt alla domäner (enkelt för utveckling)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Lägesbild Mini API med Postgres är igång!"}


app.include_router(cases.router)
app.include_router(health.router)
app.include_router(users.router)
app.include_router(logs.router)
app.include_router(auth.router)
