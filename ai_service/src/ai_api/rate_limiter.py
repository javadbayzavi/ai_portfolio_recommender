from services.cache.server import redis_client
import time
import  asyncio
import json

class TokentBucket:
    def __init__(self, capacity:int = 5, rate:int = 1):
        self.tokens = capacity
        self.capacity = capacity
        self.rate = rate
        self.last_refilled = time.time()
    
    def allow(self):
        current = time.time()
        cutoff = current - self.last_refilled
        self.tokens = min (self.capacity, self.tokens + cutoff * self.rate)

        self.last_refilled = current

        if self. tokens > 0:
            self.tokens -= 1
            return True
        return False
    def create_token(self, capacity, rate, last_refilled, tokens):
        self.capacity = capacity
        self.rate = rate
        self.last_refilled = last_refilled
        self.tokens = tokens
        return self


class RateLimiter:
    def __init__(self, cache_service = None):
        self.lock = asyncio.Lock()
        if cache_service is None:
            self.cache_client = redis_client
        else:
            self.cache_client = cache_service
    

    async def allow_client(self, client_id) -> bool:
        async with self.lock:
            data = self.cache_client.get(client_id)

            if data:
                token = TokentBucket().create_token(**json.loads(data))
            else:
                token = TokentBucket()
            
            allowed = token.allow()
            self.cache_client.set(client_id, json.dumps(token.__dict__))

            return allowed



