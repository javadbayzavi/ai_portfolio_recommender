import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { AssetsService } from "../../modules/assets/assets.service";

@Module({
  providers: [UsersService, AssetsService],
  controllers: [UsersController],
})
export class UsersModule {}
