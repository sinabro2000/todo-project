from sqlalchemy import Column, Integer, String
from db.database import Base

class User(Base):
    __tablename__ = "users_table"  # DB 안 테이블 이름
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)