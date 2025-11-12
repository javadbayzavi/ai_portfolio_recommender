import { IsString } from "class-validator";


export class PortfolioCreateDTO {  
  @IsString()
  name!: string;
  
  @IsString()
  user_id!: string;

}