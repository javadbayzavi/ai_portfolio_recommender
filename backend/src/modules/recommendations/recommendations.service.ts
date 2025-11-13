import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class RecommendationsService {
    async getRecommend(){
        return await  axios.get(
            process.env.AI_SERVICE_URL || "",
        ).then(res => res.data);
    }

}
