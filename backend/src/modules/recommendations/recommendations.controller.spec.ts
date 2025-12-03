import { Test, TestingModule } from "@nestjs/testing";
import { RecommendationsController } from "./recommendations.controller";
import { RecommendationsService } from "./recommendations.service";

const mockRecommendationsService = {
  getAssetsRecommend: jest.fn(),
  getAssetRecommend: jest.fn(),
  getPortfoliosRecommend: jest.fn(),
  getPortfolioRecommend: jest.fn(),
};


describe("RecommendationsController", () => {
  let controller: RecommendationsController;
  let service : RecommendationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationsController],
      providers: [
        {provide: RecommendationsService, useValue: mockRecommendationsService}
      ]
    }).compile();

    controller = module.get<RecommendationsController>(
      RecommendationsController,
    );
    service = module.get<RecommendationsService>(RecommendationsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return assets recommendations", async () => {
    //Given
    const recommend = {
        data: {
          assets : [
            {
              name : "EXP",
              recommend: "BUY",
              price: "1.0"
            }
          ]
        }
    }

    mockRecommendationsService.getAssetsRecommend.mockResolvedValueOnce(recommend)

    //When
    const result = await controller.getAssetsRecommend();

    //Then
    expect(result).toEqual(recommend)

  })
});
