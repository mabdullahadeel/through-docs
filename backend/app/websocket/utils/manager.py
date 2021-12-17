from typing import Any, List
from fastapi import WebSocket
from pydantic import BaseModel


class SocketMessage(BaseModel):
  type: str
  message: Any

class ConnectionManger:
  def __init__(self):
    self.active_connections: List[WebSocket] = []
    
  async def connect(self, websocket: WebSocket):
    await websocket.accept()
    self.active_connections.append(websocket)
    
  async def disconnect(self, websocket: WebSocket):
    self.active_connections.remove(websocket)
    
  async def emit(self, message: SocketMessage, sender_socket: WebSocket):
    """
      Send socket message to everyone except the sender
    """
    for connection in self.active_connections:
      if connection == sender_socket: return
      await connection.send_json(message)
    
  async def send_personal_message(self, message: SocketMessage, websocket: WebSocket):
    await websocket.send_json(message)
    
  async def broadcast(self, message: SocketMessage):
    for connection in self.active_connections:
      await connection.send_json(message)


manager = ConnectionManger()
