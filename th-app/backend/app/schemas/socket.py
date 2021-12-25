from typing import Any
from pydantic import BaseModel

class SocketMessage(BaseModel):
  type: str
  payload: Any
  