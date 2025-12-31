from sqlalchemy.orm import Session
from models.user import User


def find_by_username(db: Session, username: str) -> User:
    return db.query(User).filter(User.username == username).first()

def save(db: Session, user: User):
    try:
        db.add(user)
        db.commit()
    except Exception:
        db.rollback()
        raise