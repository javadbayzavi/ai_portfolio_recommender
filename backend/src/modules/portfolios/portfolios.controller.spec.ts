import { Test, TestingModule } from "@nestjs/testing";
import { PortfoliosController } from "./portfolios.controller";
import { PortfoliosService } from "./portfolios.service";

const mockPortfoliosService = {
  getEnrichedPortfolio: jest.fn(),
  getUserPortfolios: jest.fn(),
  getPortfolio: jest.fn(),
  getPortfolios: jest.fn(),
  createPortfolio: jest.fn(),
  updatePortfolio: jest.fn(),
  deletePortfolio: jest.fn(),
}

const mockPortfolio = {
  id: "1",
  name: "Sample portfolio",
  user_id: "1",
  created_at: new Date(),
  updated_at: new Date(),
}

describe("PortfoliosController", () => {
  let controller: PortfoliosController;
  let service: PortfoliosService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfoliosController],
      providers: [{ provide: PortfoliosService, useValue: mockPortfoliosService }],
    }).compile();

    controller = module.get<PortfoliosController>(PortfoliosController);
    service = module.get<PortfoliosService>(PortfoliosService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all portfolios", async () => {
    mockPortfoliosService.getPortfolios.mockResolvedValue([mockPortfolio]);
    const portfolios = await controller.getPortfolios();
    expect(portfolios).toEqual([mockPortfolio]);
  });

  it("should return a portfolio", async () => {
    mockPortfoliosService.getPortfolio.mockResolvedValue(mockPortfolio);
    const portfolio = await controller.getPortfolio(mockPortfolio.id);
    expect(portfolio).toEqual(mockPortfolio);
  });

  it("should create a portfolio", async () => {
    mockPortfoliosService.createPortfolio.mockResolvedValue(mockPortfolio);
    const portfolio = await controller.createPortfolio(mockPortfolio);
    expect(portfolio).toEqual(mockPortfolio);
  });

  it("should update a portfolio", async () => {
    mockPortfolio.name = "Updated portfolio";
    mockPortfoliosService.updatePortfolio.mockResolvedValue(mockPortfolio);
    expect(await controller.updatePortfolio(mockPortfolio)).toEqual(
      mockPortfolio,
    );
  });

  it("should delete a portfolio", async () => {
    mockPortfoliosService.deletePortfolio.mockResolvedValue({ id: "1" });
    const portfolio = await controller.deletePortfolio(mockPortfolio.id);
    expect(portfolio).toEqual({ id: "1" });
  });

  it("should return enriched portfolio", async () => {
    const enrichedPortfolio = {
      ...mockPortfolio,
      user: {
        id: "1",
        name: "John",
        email: "john@example.com",
      },
    };
    mockPortfoliosService.getEnrichedPortfolio.mockResolvedValue(
      enrichedPortfolio,
    );
    const portfolio = await controller.getEnrichedPortfolio(mockPortfolio.id);
    expect(portfolio).toEqual(enrichedPortfolio);
  });

});
