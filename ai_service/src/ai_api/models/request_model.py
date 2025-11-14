from ai_api.process_command import AICommand
from pydantic import BaseModel

class RequestModel(BaseModel):
    def __init__(self, command: AICommand, params: dict[str, str]):
        self.command = command
        self.params = params



