import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UserCreateDTO } from "./dto/user.create.dto";
import { UserUpdateDTO } from "./dto/user.update.dto";
import { AssetsService } from "../../modules/assets/assets.service";

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private assetsService: AssetsService,
  ) {}
  async getUser(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async create(dto: UserCreateDTO) {
    return this.prisma.user.create({
      data: dto,
    });
  }

  async update(dto: UserUpdateDTO) {
    return this.prisma.user.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async getUserPortfolios(userId: string) {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");
    const ports = await this.prisma.portfolio.findMany({
      where: {
        user_id: userId,
      },
    });
    return {
      ...user,
      portfolios: ports,
    };
  }

  async getUserAssets(userId: string) {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");
    const userPortfolios = await this.getUserPortfolios(userId);
    const assets =userPortfolios.portfolios.map(async (portfolio) => {
      const assets = await this.assetsService.getPortfolioAssets(portfolio.id);
      return assets;
    })
    return {
      ...user,
      assets: await Promise.all(assets)
    }
  }
}
