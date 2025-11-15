from ai_api.models.request_model import RequestModel
from ai_api.models.response_model import ResponseModel
from fastapi.routing import APIRouter

router = APIRouter(prefix="/recommend/users")

@router.post("/")
async def get_recommend() -> ResponseModel:
    pass

@router.post("/{user_id}")
async def get_recommend(user_id: str) -> ResponseModel:
    return ResponseModel(response="Hello from AI Service")