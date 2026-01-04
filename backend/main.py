from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.auth_router import router as auth_router


app = FastAPI()

origins = [
    "http://localhost:5173",  # Vite 기본 포트
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 허용할 프론트 주소
    allow_credentials=True,
    allow_methods=["*"],    # GET, POST, OPTIONS 등 모두 허용
    allow_headers=["*"],    # 모든 헤더 허용
)

app.include_router(auth_router)


