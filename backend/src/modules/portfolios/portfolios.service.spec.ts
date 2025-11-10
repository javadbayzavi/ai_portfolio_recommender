import { Test, TestingModule } from "@nestjs/testing";
import { PortfoliosService } from "./portfolios.service";
import { PrismaService } from "../../prisma/prisma.service";

const mockPrisma = {
  portfolio : {
     findMany: jest.fn(),
     findFirst: jest.fn(),
     create: jest.fn(),
     update: jest.fn(),
     delete: jest.fn()
  }
}

describe("PortfoliosService", () => {
  let service: PortfoliosService;
  let prisma: PrismaService;
  const mockedPortfolio = {
    id : "1",
    name : "Sample portfolio",
    user_id : "1",
    created_at : new Date(),
    updated_at : new Date()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfoliosService,
        { provide: PrismaService, useValue:mockPrisma}
      ],
    }).compile();

    service = module.get<PortfoliosService>(PortfoliosService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be defined", () => {
    expect(prisma).toBeDefined()
  })

  it("should return all portfolios", async () => {
    mockPrisma.portfolio.findMany.mockResolvedValue([mockedPortfolio])
    let result_portfolio = await service.getPortfolios()
    expect(result_portfolio).toEqual([mockedPortfolio])
  })

  it("should return a portfolio", async () => {
    mockPrisma.portfolio.findFirst.mockResolvedValue(mockedPortfolio)
    let result_portfolio = await service.getPortfolio("1")
    expect(result_portfolio).toEqual(mockedPortfolio)
  })

  it("should create a portfolio", async () => {
    let portfolio = {
      name : "Sample portfolio",
      user_id : "1",
      created_at : new Date(),
      updated_at : new Date()
    }
    mockPrisma.portfolio.create.mockResolvedValue(portfolio)
    let result_portfolio = await service.createPortfolio(portfolio)
    expect(result_portfolio).toEqual(portfolio)
  })

  it("should update a portfolio", async () => {
    mockedPortfolio.name = "Updated portfolio"
    mockPrisma.portfolio.update.mockResolvedValue(mockedPortfolio)
    let result_portfolio = await service.updatePortfolio(mockedPortfolio)
    expect(result_portfolio).toEqual(mockedPortfolio)
  })

  it("should delete a portfolio", async () => {
    mockPrisma.portfolio.delete.mockResolvedValue({id : "1"})
    let result = await service.deletePortfolio("1")
    expect(result).toEqual({id : "1"})
  })

  it("should return user portfolios", async () => {
    mockPrisma.portfolio.findMany.mockResolvedValue([mockedPortfolio])
    let result_portfolio = await service.getUserPortfolios("1")
    expect(result_portfolio).toEqual([mockedPortfolio])
  })

});
