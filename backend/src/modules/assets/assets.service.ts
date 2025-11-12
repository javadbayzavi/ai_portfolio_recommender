import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  async getAssets() {
    return this.prisma.asset.findMany();
  }

  async getAssetById(id: string) {
    return this.prisma.asset.findUnique({
      where: {
        id,
      },
    });
  }

  async createAsset(asset: any) {
    return this.prisma.asset.create({
      data: asset,
    });
  }

  async updateAsset(asset: any) {
    return this.prisma.asset.update({
      where: {
        id: asset.id,
      },
      data: asset,
    });
  }

  async deleteAsset(id: string) {
    return this.prisma.asset.delete({
      where: {
        id,
      },
    });
  }

  async getPortfolioAssets(portfolioId: string) {
    return this.prisma.asset.findMany({
      where: {
        portfolio_id: portfolioId,
      },
    });
  }
  async getEnrichedAsset(assetId: string) {
    const asset = await this.getAssetById(assetId);
    if (!asset) throw new Error("Asset not found");
    //Here we can also get portfolio indirectly via portfoli service
    const portfolio = await this.prisma.portfolio.findUnique({
      where: {
        id: asset!.portfolio_id,
      },
    });
    return {
      ...asset,
      portfolio,
    };
  }
}
