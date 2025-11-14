from redis import Redis
import logging
import json
from ai_api.process_requester import register_process_handler
from ai_api.process_requester import AICommand

class CacheTemplate:
    def __init__(self, id: str | None = None, response: str | None = None, requester: str | None = None, subject: str | None = None):
        self.id = id
        self.response = response
        self.requester = requester
        self.subject = subject
    
    def to_dic(self):
        return self.__dict__
    
    def __eq__(self, value):
        if not isinstance(value, CacheTemplate):
            return False
        return self.__dict__ == value.__dict__




logger = logging.getLogger("CacheService")


class CacheService:
    def __init__(self, redis=None):
        self.redis_client = redis or self.initiate_default_cache()


    def get(self, key) -> CacheTemplate:
        raw_data = self.redis_client.json().get(key, ".")
        return CacheTemplate(**raw_data) if raw_data is not None  else None
    


    def set(self, key, value: CacheTemplate):
        self.redis_client.json().set(key, ".", value.to_dic())
    
    def delete(self, key):
        self.redis_client.json().delete(key, ".")
        self.redis_client.delete(key)

    def clear(self):
        self.redis_client.flushdb()

    def initiate_default_cache(self):
            return Redis(host='localhost', db=0, port=6379, decode_responses=True)

cache_service = CacheService()


def cache_lookup(param: dict[str, str]) -> dict[str, str]:
    raise(NotImplementedError)

register_process_handler(AICommand.RECOMMEND, cache_lookup)