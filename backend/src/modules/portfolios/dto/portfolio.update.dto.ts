import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { PortfolioCreateDTO } from "./portfolio.create.dto";


export class PortfolioUpdateDTO extends PartialType(PortfolioCreateDTO) {
  @IsString()
  id!: string;
}
