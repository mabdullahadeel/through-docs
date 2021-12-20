from fastapi import APIRouter, WebSocket
from starlette.responses import HTMLResponse
from starlette.websockets import WebSocketDisconnect
from app.websocket.utils.manager import manager as ws_manager
from app.schemas.socket import SocketMessage

docs_router = APIRouter()


html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <h2>Your ID: <span id="ws-id"></span></h2>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            let splitted = window.location.href.split("/")
            let client_id = splitted[splitted.length - 1]
            document.querySelector("#ws-id").textContent = client_id;
            var ws = new WebSocket(`ws://localhost:8000/th-docs/${client_id}`);
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""

@docs_router.get("/{doc_id}")
async def get(doc_id: str):
    return HTMLResponse(html)



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
