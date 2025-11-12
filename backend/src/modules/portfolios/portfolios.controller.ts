import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { PortfoliosService } from "./portfolios.service";

@Controller("portfolios")
export class PortfoliosController {
  constructor(private service: PortfoliosService) {}

  @Get()
  getPortfolios() {
    return this.service.getPortfolios();
  }

  @Get(":id")
  getPortfolio(@Param("id") id: string) {
    return this.service.getPortfolio(id);
  }

  @Post()
  createPortfolio(@Body() portfolio: any) {
    return this.service.createPortfolio(portfolio);
  }

  @Put()
  updatePortfolio(@Body() portfolio: any) {
    return this.service.updatePortfolio(portfolio);
  }

  @Delete(":id")
  deletePortfolio(@Param("id") id: string) {
    return this.service.deletePortfolio(id);
  }

  @Get(":id/user")
  getEnrichedPortfolio(@Param("id") id: string) {
    return this.service.getEnrichedPortfolio(id);
  }
    @Get(":id/assets")
    getPortfolioAssets(@Param("id") id: string){
        return this.service.getPortfolioAssets(id)
    }

}
