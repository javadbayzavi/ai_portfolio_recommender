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
import { PortfolioCreateDTO } from "./dto/portfolio.create.dto";
import { PortfolioUpdateDTO } from "./dto/portfolio.update.dto";

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
  createPortfolio(@Body() portfolio: PortfolioCreateDTO) {
    return this.service.createPortfolio(portfolio);
  }

  @Put()
  updatePortfolio(@Body() portfolio: PortfolioUpdateDTO) {
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
