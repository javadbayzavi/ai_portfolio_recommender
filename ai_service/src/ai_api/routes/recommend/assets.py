from ai_api.models.request_model import RequestModel
from ai_api.models.response_model import ResponseModel
from fastapi.routing import APIRouter
from services.recommend.assets import AssetRecommendationService

class AssetsModel(RequestModel):
    assets: list[str]

# router = APIRouter(prefix="/recommend/assets")

# @router.post("/")
# async def get_recommend(request: AssetsModel) -> ResponseModel:
#     pass

# @router.get("/{asset}")
# async def get_recommend(asset: str) -> ResponseModel:
#     result = AssetRecommendationService().getRecommend(asset=asset)
#     return ResponseModel(response=result)

class AssetRecommendationRouter:
    def __init__(self, asset_recommender_service: AssetRecommendationService = None):
        self.service = asset_recommender_service if asset_recommender_service is not None else AssetRecommendationService()
        self.router = APIRouter(prefix="/recommend/assets")

    def getRoute(self):
        self.router.add_route("/", self.get_recommend, methods=["POST"])
        self.router.add_route("/{asset}", self.get_recommend, methods=["GET"] )
        return self.router


    # @router.post("/")
    async def get_recommend(self, request: AssetsModel) -> ResponseModel:
        pass

    # @router.get("/{asset}")
    async def get_recommend(self, asset: str) -> ResponseModel:
        result = self.service.getRecommend(asset=asset)
        return ResponseModel(response=result)
