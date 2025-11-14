from fastapi.testclient import TestClient
from ai_api.api import app
import pytest

@pytest.fixture()
def client():
    client = TestClient(app)
    return client

def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"response" : {"message": "Hello from AI Service"}}

