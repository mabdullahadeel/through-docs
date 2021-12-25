from fastapi import APIRouter, WebSocket
from starlette.responses import HTMLResponse
from starlette.websockets import WebSocketDisconnect
from app.websocket.utils.manager import manager as ws_manager
from app.schemas.socket import SocketMessage

docs_router = APIRouter()


@docs_router.websocket("/{doc_id}")
async def websocket_endpoint(websocket: WebSocket, doc_id: str):
    doc_room_id = "room-{}".format(doc_id)
    await ws_manager.connect(websocket, room_id=doc_room_id)
    try:
        while True:
            data: SocketMessage = await websocket.receive_json()
            await ws_manager.emit(data, room_id=doc_room_id, sender_socket=websocket)
    except WebSocketDisconnect:
        await ws_manager.disconnect(websocket, room_id=doc_room_id)
        await ws_manager.emit(f"Client #{doc_id} left the chat", sender_socket=websocket, room_id=doc_room_id)
