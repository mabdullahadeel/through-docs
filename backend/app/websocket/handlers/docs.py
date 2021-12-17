from fastapi import APIRouter, WebSocket
from starlette.websockets import WebSocketDisconnect
from app.websocket.utils import manager as ws_manager

docs_router = APIRouter()


@docs_router.websocket("/")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await ws_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await ws_manager.send_personal_message(f"You wrote: {data}", websocket)
            await ws_manager.broadcast(f"Client #{client_id} says: {data}")
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
        await ws_manager.broadcast(f"Client #{client_id} left the chat")
