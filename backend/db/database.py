from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 데이터 베이스 주소 설정
DATABASE_URL = "mysql+pymysql://root:1111@localhost:3306/home" 

# SQLAlchemy 엔진 생성
engine = create_engine(DATABASE_URL,echo=True, future=True)

# 세션 생성기
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

# 베이스 클래스
Base = declarative_base()

