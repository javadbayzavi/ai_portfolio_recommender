from ai_api.models.response_model import ResponseModel
from fastapi.routing import APIRouter

router = APIRouter(prefix="/recommend/trends")

@router.post("/hot")
async def get_recommend() -> ResponseModel:
    pass

@router.post("/high")
async def get_recommend() -> ResponseModel:
    return ResponseModel(response="Hello from AI Service")