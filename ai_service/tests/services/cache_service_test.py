import pytest
from testcontainers.redis import RedisContainer
from redis import Redis
from services.cache_service import CacheService, CacheTemplate


@pytest.fixture
def redis_client():
    with RedisContainer() as container:
        client = Redis(host=container.get_container_host_ip(), port=container.get_exposed_port(6379))
        client.ping()
        yield container.get_client()
        client.flushdb()
        client.close()
        client.connection_pool.disconnect()
    

@pytest.fixture
def cache_service_instance(redis_client):
    return CacheService(redis_client)


@pytest.fixture
def cache_template_instance():
    cache_item = CacheTemplate()
    cache_item.id = "test_id"
    cache_item.response = "test_response"
    cache_item.requester = "test_requester"
    cache_item.subject = "test_subject"
    return cache_item


def test_should_define_cache_service(redis_client):
    cache = CacheService(redis_client)
    assert cache is not None


def test_should_add_to_cache(redis_client,cache_service_instance, cache_template_instance):
    cache_service_instance.set("test_key",cache_template_instance)
    redis = redis_client
    assert redis.json().get("test_key") == cache_template_instance.to_dic()

def test_should_lookup_cache(cache_service_instance, cache_template_instance):
    cache_service_instance.set("test_key", cache_template_instance)
    assert cache_service_instance.get("test_key") == cache_template_instance
    

def teat_should_delete_cache(redis_client, cache_service_instance, cache_template_instance):
    cache_service_instance.set("test_key", cache_template_instance)
    cache_service_instance.delete("test_key")
    assert cache_service_instance.get("test_key") is None
    assert redis_client.json().get("test_key") is None

def test_should_get_null_when_no_cache_item_exist(cache_service_instance):
    assert cache_service_instance.get("test_key") is None

def test_should_update_cache(cache_service_instance, cache_template_instance):
    cache_service_instance.set("test_key", cache_template_instance)
    new_cache_item = CacheTemplate(
        "2",
        "new_response",
        "new_requester",
        "new_subject"
    )
    assert cache_service_instance.get("test_key") != new_cache_item
    
    cache_service_instance.set("test_key", new_cache_item)
    assert cache_service_instance.get("test_key") == new_cache_item


    