from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse

import services.user_service as user_service

from schemas.auth.signup_request import SignUpRequest
from schemas.auth.login_request import LoginRequest
from schemas.auth.login_response import LoginResponse
from exceptions import DuplicateUserException, InvalidCredentialException
from services.jwt_service import create_access_token
from db.database import SessionLocal



router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup(signup_req: SignUpRequest, db: Session = Depends(get_db)):
    
    #DB에 사용자 등록
    try:
        user_service.create_user(db, signup_req.username, signup_req.password)
        return {"message": "회원가입에 성공했습니다"}
    except DuplicateUserException:
        raise HTTPException(status_code=400, detail="이미 존재하는 사용자")


@router.post("/login",response_model=LoginResponse)
async def login(login_req: LoginRequest, db: Session = Depends(get_db)):
    try:
        user = user_service.authenticate_user(
            db,
            login_req.username,
            login_req.password
        )
    except InvalidCredentialException:
        raise HTTPException(status_code=401, detail="로그인 실패: 잘못된 정보")

    token = create_access_token({"sub": user["username"]})

    response = JSONResponse(content={"message": "로그인 성공"})
    response.set_cookie(
        key="access_token",      # 쿠키 이름
        value=token,             # 토큰 값
        httponly=True,           # JS에서 접근 불가
        max_age=3600,            # 초 단위 만료 시간
        secure=False,            # https일 경우 True
        samesite="lax"           # CSRF 방어
    )
    return response
    
