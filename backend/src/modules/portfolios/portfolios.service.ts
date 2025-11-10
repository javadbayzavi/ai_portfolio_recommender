import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class PortfoliosService {
    constructor(private prisma: PrismaService){}

    async getPortfolio(id: string){
        return this.prisma.portfolio.findFirst({
            where: {
                id
            }
        })
    }

    async getPortfolios() {
        return this.prisma.portfolio.findMany()
    }

    async createPortfolio(portfolio: any) {
        return this.prisma.portfolio.create({
            data : portfolio
        })
    }

    async updatePortfolio(portfolio: any) {
        return this.prisma.portfolio.update({
            where: {
                id: portfolio.id
            },
            data: portfolio
        })
    }

    async deletePortfolio(id: string) {
        return this.prisma.portfolio.delete({
            where: {
                id
            }
        })
    }

    async getUserPortfolios(userId: string){
        return this.prisma.portfolio.findMany({
            where: {
                user_id: userId
            }
        })
    }

    async getEnrichedPortfolio(portfolioId: string){
        const portfolio = await this.getPortfolio(portfolioId)
        if(!portfolio) throw new Error("Portfolio not found")
            
        const user = await this.prisma.user.findUnique({
            where: {
                id: portfolio!.user_id
            }
        })
        return {
            ...portfolio,
            user
        }
    }
}
