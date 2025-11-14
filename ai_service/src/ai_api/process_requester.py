from ai_api.models.request_model import RequestModel
from ai_api.models.response_model import ResponseModel
from typing import Callable
from ai_api.process_command import AICommand

process_handlers : dict[str, Callable[[dict[str, str]], dict[str, str]]] = {}

def register_process_handler(command: AICommand, handler: callable):
    process_handlers[command.value] = handler

def get_process_handler(command: AICommand) -> callable:
    return process_handlers.get(command.value, None)


async def process_request(request: RequestModel) -> ResponseModel:
    handler = get_process_handler(request.command)
    result : dict[str, str] = {}

    if handler is None:
        result = handler(request.params)

    return ResponseModel(result)

