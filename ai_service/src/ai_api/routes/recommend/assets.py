from ai_api.models.request_model import RequestModel
from ai_api.models.response_model import ResponseModel
from fastapi.routing import APIRouter
from services.recommend.assets import AssetRecommendationService

class AssetsModel(RequestModel):
    assets: list[str]

router = APIRouter(prefix="/recommend/assets")

@router.post("/")
async def get_recommend(request: AssetsModel) -> ResponseModel:
    pass

@router.get("/{asset}")
async def get_recommend(asset: str) -> ResponseModel:
    result = AssetRecommendationService().getRecommend(asset=asset)
    return ResponseModel(response=result)