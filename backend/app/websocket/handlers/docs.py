from fastapi import APIRouter, WebSocket


docs_router = APIRouter()


@docs_router.websocket("/", "websocket.docs")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")