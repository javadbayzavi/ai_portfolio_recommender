import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: {
    id: string;
    name: string;
    email: string;
  } = {
    id: "123",
    name: "alice",
    email: "alice@example.com",
  };
  const mockUsersService = {
    create: jest.fn().mockImplementation((dto) => ({ id: "1", ...dto })),
    getUsers: jest.fn(() => [mockUser]),
    getUser: jest.fn((id) => ({ ...mockUser })),
    update: jest.fn((dto) => ({ ...dto })),
    delete: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a user", async () => {
    const user = await controller.createUser(mockUser);
    expect(user).toEqual({ ...mockUser });
  });

  it("should return all users", async () => {
    const users = await controller.getUsers();
    expect(users).toHaveLength(1)
    expect(users).toEqual([mockUser]);
  });

  it("should return a user by id", async () => {
    const user = await controller.getUser(mockUser.id);
    expect(user).toEqual(mockUser);
  });

  it("should update a user by id", async () => {
    mockUser.name = "bob";
    mockUser.email = "bob@example.com";
    const user = await controller.updateUser(mockUser);
    expect(user).toEqual(mockUser);
  });

  it("should delete a user by id", async () => {
    const user = await controller.deleteUser(mockUser.id);
    expect(user).toEqual({ id: mockUser.id });
  });

});
