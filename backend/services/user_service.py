from typing import Optional
from sqlalchemy.orm import Session
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash



def create_user(db: Session, username: str, password: str):
    hashed_password = generate_password_hash(password)  # 비밀번호 해싱
    new_user = User(username=username, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def authenticate_user(db: Session, username: str, password: str) -> Optional[dict]:
    user = db.query(User).filter(User.username == username).first()
    if user and check_password_hash(user.password, password):
        return {"username": user.username, "id": user.id}
    return None
