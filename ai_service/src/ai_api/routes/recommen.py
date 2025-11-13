from ai_api.api import app
from ai_api.models.request_model import RequestModel
from ai_api.models.response_model import ResponseModel


@app.get("/recommend")
async def get_recommend(request: RequestModel) -> ResponseModel:
    return ResponseModel(response="Hello from AI Service")