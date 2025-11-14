from redis import Redis

class CacheTemplate:
    response : str
    requester: str
    subject: str



class CacheService:
    def __init__(self):
        self.redis = Redis(host='localhost', port=6379, decode_responses=True)
        pass

    def get(self, key):
        self.redis.get_cache(key)

    def set(self, key, value):
        self.redis.set(key, value)
        self.redis.json().set(key, ".", value)
    
    def delete(self, key):
        pass

    def clear(self):
        pass

    def initiate(self):
        if self.redis is None:
            self.redis = Redis(host='localhost', port=6379, decode_responses=True)

cache_service = CacheService()
cache_service.initiate()