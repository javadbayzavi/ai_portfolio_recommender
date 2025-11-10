import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class PortfoliosService {
    constructor(private prisma: PrismaService){}

    async getPortfolio(id: string){}

    async getPortfolios() {}

    async createPortfolio(portfolio: any) {}

    async updatePortfolio(portfolio: any) {}

    async deletePortfolio(id: string) {}
}
