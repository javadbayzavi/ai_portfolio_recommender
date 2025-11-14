from ai_api.models import RequestModel
from ai_api.models import ResponseModel
from typing import Callable


process_handlers : dict[str, Callable[[dict[str, str]], dict[str, str]]] = {}

def register_process_handler(command: str, handler: callable):
    process_handlers[command] = handler

def get_process_handler(command: str) -> callable:
    return process_handlers.get(command, None)


async def process_request(request: RequestModel) -> ResponseModel:
    handler = get_process_handler(request.command)
    result : dict[str, str] = {}

    if handler is None:
        result = handler(request.params)

    return ResponseModel(result)

