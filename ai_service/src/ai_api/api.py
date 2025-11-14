from fastapi import FastAPI
from ai_api.models.response_model import ResponseModel
from ai_api.models.request_model import RequestModel
from ai_api.process_requester import process_request
from ai_api.process_command import AICommand


app = FastAPI()

@app.get("/")
async def root():
    return ResponseModel(
            {"message": "Hello from AI Service"}
        )

@app.get("/recommend/{asset}")
async def recommend(asset: str):
    return process_request(
            RequestModel(AICommand.RECOMMEND, {"asset": asset})
        )


