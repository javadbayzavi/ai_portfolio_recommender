import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class RecommendationsService {
    async getAssetsRecommend(){
        return await  axios.post(
            `${process.env.AI_SERVICE_URL || ""}recommend/assets`,
        ).then(res => res.data);
    }

    async getAssetRecommend(asset: string){
        return await  axios.get(
            `${process.env.AI_SERVICE_URL || ""}recommend/assets/${asset}`,
        ).then(res => res.data);
    }

    async getPortfoliosRecommend(){
        return await  axios.post(
            `${process.env.AI_SERVICE_URL || ""}recommend/portfolios`,
        ).then(res => res.data);
    }

    async getPortfolioRecommend(portfolio: string){
        return await  axios.get(
            `${process.env.AI_SERVICE_URL || ""}recommend/portfolios/${portfolio}`,
        ).then(res => res.data);
    }


}
