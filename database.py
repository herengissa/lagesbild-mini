from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

# Skapa SQLite-databas
engine = create_engine("sqlite:///lagesbild.db", echo=True)

Base = declarative_base()

# Modell för tabellen
class Status(Base):
    __tablename__ = "status"

    id = Column(Integer, primary_key=True, index=True)
    status = Column(String)
    plats = Column(String)
    tid = Column(String)

# Skapa tabellerna om de inte finns
Base.metadata.create_all(bind=engine)

# Session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
