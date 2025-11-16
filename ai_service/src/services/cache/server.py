from environment import CACHE_DB, CACHE_HOST, CACHE_PORT
from redis import Redis

redis_client = Redis(host=CACHE_HOST, port=CACHE_PORT, db=CACHE_DB)