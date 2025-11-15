from ai_api.models.request_model import RequestModel
from ai_api.models.response_model import ResponseModel
from fastapi.routing import APIRouter

class PortfolioModel(RequestModel):
    portfolios: list[str]

router = APIRouter(prefix="/recommend/portfolios")

@router.post("/")
async def get_recommend(request: PortfolioModel) -> ResponseModel:
    pass

@router.post("/{portfolio_id}")
async def get_recommend(portfolio_id: str) -> ResponseModel:
    return ResponseModel(response="Hello from AI Service")