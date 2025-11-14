from ai_api.process_command import AICommand

class RequestModel():
    def __init__(self, command: AICommand, params: dict[str, str]):
        self.command = command
        self.params = params



