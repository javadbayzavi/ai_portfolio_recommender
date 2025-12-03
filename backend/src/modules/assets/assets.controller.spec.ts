import { Test, TestingModule } from "@nestjs/testing";
import { AssetsController } from "./assets.controller";
import { AssetsService } from "./assets.service";

const mockAssetService = {
  getAssets: jest.fn(),
}

describe("AssetsController", () => {
  let controller: AssetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsController],
      providers: [
        { provide: AssetsService, useValue: mockAssetService }
      ]

    }).compile();

    controller = module.get<AssetsController>(AssetsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
