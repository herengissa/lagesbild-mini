from sqlalchemy import Column, Integer, String, Text
from database import Base

class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    type = Column(String, nullable=False)
    description = Column(Text, nullable=False)
