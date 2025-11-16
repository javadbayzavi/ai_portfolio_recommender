from services.cache.server import redis_client
import secrets
class URLShortener:
    def __init__(self, cache_service = None):
        if cache_service is None:
            self.cache_client = redis_client
        else:
            self.cache_client = cache_service
    

    def shorten(self, url:str) -> str:
        while True:
            code = secrets.token_urlsafe(10)
            if(self.cache_client.get(code) is None):
                self.cache_client.set(code, url)
            return code
    
    def resolve(self, code:str) -> str:
        return self.cache_client.get(code)