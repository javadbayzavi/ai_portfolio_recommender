from fastapi import FastAPI
from ai_api.models.response_model import ResponseModel

app = FastAPI()

@app.get("/")
async def root():
    return ResponseModel("Hello from AI Service")

