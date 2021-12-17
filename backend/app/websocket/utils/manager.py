from typing import Any, Dict, List
from fastapi import WebSocket
from pydantic import BaseModel

class SocketMessage(BaseModel):
  type: str
  data: Any
  
ActiveConnectionType = Dict[str, List[WebSocket]]
class DocsConnectionManger:
  def __init__(self):
    self.active_connections: ActiveConnectionType = {}
  
  def _is_rooom_connected(self, room_id: str):
    return self.active_connections.get(room_id) is not None
  
  
  async def connect(self, websocket: WebSocket, room_id: str):
    await websocket.accept()
    if not self._is_rooom_connected(room_id):
      self.active_connections[room_id] = []
    
    self.active_connections[room_id].append(websocket)
  
  
  async def disconnect(self, websocket: WebSocket, room_id: str):
    if not self._is_rooom_connected(room_id): return
    
    self.active_connections[room_id].remove(websocket)
    # garbage collected if no more connections
    if self.active_connections[room_id] == []:
      del self.active_connections[room_id]
  
  
  async def emit(self, message: SocketMessage, sender_socket: WebSocket, room_id: str):
    """
      Send socket message to everyone except the sender
    """
    if not self._is_rooom_connected(room_id): return
    for connection in self.active_connections[room_id]:
      if connection == sender_socket: return
      await connection.send_json(message)
  
  
  async def send_personal_message(self, message: SocketMessage, websocket: WebSocket):
    await websocket.send_json(message)
  
  
  async def broadcast(self, message: SocketMessage, room_id: str):
    if not self._is_rooom_connected(room_id): return
    for connection in self.active_connections[room_id]:
      await connection.send_json(message)


manager = DocsConnectionManger()