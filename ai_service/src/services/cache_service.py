from services.cache.server import redis_client
import logging
from ai_api.process_requester import register_process_handler
from ai_api.process_requester import AICommand
from dataclasses import dataclass
from environment import CACHE_HOST, CACHE_PORT, CACHE_DB

@dataclass
class CacheTemplate:
    id : str | None = None
    response : str | None = None
    requester : str | None = None
    subject : str | None = None

    def to_dic(self):
        return self.__dict__




logger = logging.getLogger("CacheService")


class CacheService:
    def __init__(self, redis=None):
        self.redis_client = redis or self.initiate_default_cache()


    def get(self, key) -> CacheTemplate:
        raw_data = self.redis_client.json().get(key, ".")
        return CacheTemplate(**raw_data) if raw_data is not None  else None
    


    def set(self, key, value: CacheTemplate):
        self.redis_client.json().set(key, ".", value.__dict__)
    
    def delete(self, key):
        self.redis_client.json().delete(key, ".")
        self.redis_client.delete(key)

    def clear(self):
        self.redis_client.flushdb()

    def initiate_default_cache(self):
            return redis_client

cache_service = CacheService()


def cache_lookup(param: dict[str, str]) -> dict[str, str]:
    raise(NotImplementedError)

register_process_handler(AICommand.RECOMMEND, cache_lookup)