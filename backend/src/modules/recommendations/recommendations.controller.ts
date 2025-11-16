import { Controller, Get, Post, Param } from "@nestjs/common";
import { RecommendationsService } from "./recommendations.service";


@Controller("recommendations")
export class RecommendationsController {
    constructor(private service: RecommendationsService){}

    @Post("/assets")
    async getAssetsRecommend(){
        return this.service.getAssetsRecommend();
    }

    @Get("/assets/:asset")
    async getAssetRecommend(@Param("asset") asset: string){
        return this.service.getAssetRecommend(asset);
    }

    @Post("/portfolios")
    async getPortfoliosRecommend(){
        return this.service.getPortfoliosRecommend();
    }

    @Get("/portfolios/:portfolio")
    async getPortfolioRecommend(@Param("portfolio") portfolio: string){
        return this.service.getPortfolioRecommend(portfolio);
    }

}
