from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    type = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    
    status_id = Column(Integer, ForeignKey("case_status.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    status = relationship("CaseStatus")
    user = relationship("User")
    logs = relationship("CaseLog", back_populates="case")
    

class CaseStatus(Base):
    __tablename__ = "case_status"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # admin, operator, viewer

class CaseLog(Base):
    __tablename__ = "case_logs"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("cases.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    case = relationship("Case", back_populates="logs")
    user = relationship("User")