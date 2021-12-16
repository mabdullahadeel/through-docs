from fastapi import APIRouter
from app.api.api_v1.endpoints import users


api_v1_router = APIRouter()

api_v1_router.include_router(users.user_router, prefix="/users", tags=["users"])