from fastapi import FastAPI
from ai_api.models.response_model import ResponseModel

app = FastAPI()
@app.patch("/")
async def root():
    response = ResponseModel(response="Hello from AI Service")
    return {
        response
    }
