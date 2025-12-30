from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse

from services.user_service import create_user, authenticate_user
from services.jwt_service import create_access_token
from db.database import SessionLocal

router = APIRouter()
# 요청 바디 모델

class SignUpRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str
    
# 응답 모델
class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup(signup_req: SignUpRequest, db: Session = Depends(get_db)):
    #DB에 사용자 등록
    user = create_user(db, signup_req.username, signup_req.password)
    if not user:
        raise HTTPException(status_code=400, detail="회원가입 실패: 이미 존재하는 사용자")
    
    #가입 성공 시 사용자 정보 반환
    return {"message": "회원가입에 성공했습니다"}


@router.post("/login",response_model=LoginResponse)
async def login(login_req: LoginRequest, db: Session = Depends(get_db)):
    
    
    #1. 사용자 인증
    user = authenticate_user(db,login_req.username, login_req.password)
    if not user:
        raise HTTPException(status_code=401, detail="로그인 실패:잘못된 정보")
    
    #2. JWT 토큰 생성
    token = create_access_token({"sub": user["username"]})
    
    response = JSONResponse(content={"message": "로그인 성공"})
    
    # 쿠키 설정
    response.set_cookie(
        key="access_token",      # 쿠키 이름
        value=token,             # 토큰 값
        httponly=True,           # JS에서 접근 불가
        max_age=3600,            # 초 단위 만료 시간
        secure=False,            # https일 경우 True
        samesite="lax"           # CSRF 방어
    )
    
    return response
    
