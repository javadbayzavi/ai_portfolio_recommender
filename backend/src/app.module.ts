import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/users/users.module";
import { PortfoliosModule } from "./modules/portfolios/portfolios.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AssetsModule } from "modules/assets/assets.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    PortfoliosModule,
    AssetsModule
  ],
})
export class AppModule {}
