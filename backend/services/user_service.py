from typing import Optional
from sqlalchemy.orm import Session

from werkzeug.security import generate_password_hash, check_password_hash

from models.user import User
import repository.user_repository as user_repo
from exceptions import DuplicateUserException, InvalidCredentialException




def create_user(db: Session, username: str, password: str):
    if user_repo.find_by_username(db, username):
        raise DuplicateUserException()
    hashed_password = generate_password_hash(password)  # 비밀번호 해싱
    user = User(username=username, password=hashed_password) # User 정보 넣기
    user_repo.save(db, user) # DB 저장
    
def authenticate_user(db: Session, username: str, password: str) -> Optional[dict]:
    user = user_repo.find_by_username(db, username)

    if not user or not check_password_hash(user.password, password):
        raise InvalidCredentialException()
    
    return {
        "id": user.id,
        "username": user.username
    }
    