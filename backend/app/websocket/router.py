from fastapi import APIRouter
from .handlers import docs

websocket_router = APIRouter()

websocket_router.include_router(docs.docs_router, prefix="/docs")