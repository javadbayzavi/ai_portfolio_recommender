import { Controller, Get, Post, Put, Delete, Body, Param} from "@nestjs/common";
import { AssetsService } from "./assets.service";

@Controller("assets")
export class AssetsController {
    constructor(private service: AssetsService){}

    @Get()
    getAssets(){
        return this.service.getAssets()
    }

    @Get(":id")
    getAsset(@Param("id") id: string){
        return this.service.getAssetById(id)
    }

    @Post()
    createAsset(@Body() asset: any){
        return this.service.createAsset(asset)
    }
    @Put()
    updateAsset(@Body() asset: any){
        return this.service.updateAsset(asset)
    }
    @Delete(":id")
    deleteAsset(@Param("id") id: string){
        return this.service.deleteAsset(id)
    }
    @Get(":id/portfolio")
    getEnrichedAsset(@Param("id") id: string){
        return this.service.getEnrichedAsset(id)
    }
}
