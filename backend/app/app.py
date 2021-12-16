from fastapi import FastAPI
from app.api.api_v1.router import api_v1_router
from app.websocket.router import websocket_router
from app.core.config import settings

app = FastAPI(
  title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.include_router(router=api_v1_router, prefix=settings.API_V1_STR)
app.include_router(router=websocket_router)
