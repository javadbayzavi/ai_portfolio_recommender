import { Module } from "@nestjs/common";
import { PortfoliosService } from "./portfolios.service";
import { PortfoliosController } from "./portfolios.controller";
import { AssetsService } from "../../modules/assets/assets.service";

@Module({
  providers: [PortfoliosService, AssetsService],
  controllers: [PortfoliosController],
})
export class PortfoliosModule {}
