from fastapi import APIRouter
from app.api.api_v1.endpoints import users
from app.api.api_v1.endpoints import th_docs


api_v1_router = APIRouter()

api_v1_router.include_router(users.user_router, prefix="/users", tags=["users"])
api_v1_router.include_router(th_docs.th_docs_router, prefix="/d/docs", tags=["th_docs"])