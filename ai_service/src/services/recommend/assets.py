import services.db.db_service as db_service

class AssetRecommendationService:
    def __init__(self):
        pass

    def getRecommend(self, asset: str):
        #First look for recent recommendations in the cache service then go for db logic
        return (model.get_dict() for model in db_service.get_portfolios_for_asset(asset_name=asset))

