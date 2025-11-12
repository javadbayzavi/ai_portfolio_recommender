import { Test, TestingModule } from "@nestjs/testing";
import { AssetsService } from "./assets.service";
import { PrismaService } from "../../prisma/prisma.service";

const mockPrisma = {
  asset: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  portfolio: {
    findUnique: jest.fn(),
  },
};

describe("AssetsService", () => {
  let service: AssetsService;
  let prisma: PrismaService;

  const mockAsset = {
    id: "1",
    name: "test",
    symbol: "test",
    type: "test",
    price: 100,
    portfolio_id: "1",
    quantity: 2,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<AssetsService>(AssetsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be defined", async () => {
    expect(await service).toBeDefined();
  });

  it("should create an asset", async () => {
    mockPrisma.asset.create.mockResolvedValue({ mockAsset });
    expect(await service.createAsset(mockAsset)).toEqual({ mockAsset });
  });

  it("should update an asset", async () => {
    mockAsset.name = "test2";
    mockPrisma.asset.update.mockResolvedValue({ mockAsset });
    expect(await service.updateAsset(mockAsset)).toEqual({ mockAsset });
  });

  it("should delete an asset", async () => {
    mockPrisma.asset.delete.mockResolvedValue({ mockAsset });
    expect(await service.deleteAsset(mockAsset.id)).toEqual({ mockAsset });
  });

  it("should get an asset", async () => {
    mockPrisma.asset.findUnique.mockResolvedValue({ mockAsset });
    expect(await service.getAssetById(mockAsset.id)).toEqual({ mockAsset });
  });
  it("should get all assets", async () => {
    mockPrisma.asset.findMany.mockResolvedValue([mockAsset]);
    expect(await service.getAssets()).toEqual([mockAsset]);
  });

  it("should get portfolio assets", async () => {
    mockPrisma.asset.findMany.mockResolvedValue([mockAsset]);
    expect(await service.getPortfolioAssets(mockAsset.portfolio_id)).toEqual([
      mockAsset,
    ]);
  });

  it("should get enriched asset", async () => {
    mockPrisma.asset.findUnique.mockResolvedValue(mockAsset);
    const portfolio = {
      id: "1",
      name: "test",
      user_id: "1",
    };
    mockPrisma.portfolio.findUnique.mockResolvedValue(portfolio);
    const actual = await service.getEnrichedAsset(mockAsset.id);
    const expected = { portfolio, ...mockAsset };
    expect(actual).toEqual(expected);
  });
});
