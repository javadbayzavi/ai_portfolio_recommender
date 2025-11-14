from redis import Redis
import logging
import json
from ai_api.process_requester import register_process_handler
from ai_api.process_requester import AICommand

class CacheTemplate:
    def __init__(self):
        self.id: str
        self.response : str
        self.requester: str
        self.subject: str

logger = logging.getLogger("CacheService")


class CacheService:
    def __init__(self):
        self.redis = Redis(host='localhost', db=0, port=6379, decode_responses=True)
        pass

    def get(self, key) -> CacheTemplate:
        self.redis.get_cache(key)
        raw_json = self.redis.json().get(key, ".")
        return json.loads(raw_json)

    def set(self, key, value: CacheTemplate):
        self.redis.set(key, value)
        self.redis.json().set(key, ".", json.dumps(value))
    
    def delete(self, key):
        self.redis.json().delete(key, ".")
        self.redis.delete(key)

    def clear(self):
        self.redis.flushdb()

    def initiate(self):
        if self.redis is None:
            self.redis = Redis(host='localhost', db=0, port=6379, decode_responses=True)

cache_service = CacheService()
cache_service.initiate()


def cache_lookup(param: dict[str, str]) -> dict[str, str]:
    pass

register_process_handler(AICommand.RECOMMEND, cache_lookup)