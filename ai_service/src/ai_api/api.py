from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_api.models.response_model import ResponseModel
from ai_api.models.request_model import RequestModel
from ai_api.process_requester import process_request
from ai_api.process_command import AICommand
from environment import ALLOWED_METHODS, ALLOWED_ORIGINS

app = FastAPI()
print(ALLOWED_ORIGINS, ALLOWED_METHODS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=ALLOWED_METHODS,
    allow_headers=["*"]
    )

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


