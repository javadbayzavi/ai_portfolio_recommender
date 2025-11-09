import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PrismaService } from "../../prisma/prisma.service";

const mockPrismaService = {
  user: {
    findMany: jest
      .fn()
      .mockResolvedValue([
        { id: "1", name: "John", email: "john@example.com" },
      ]),
    findUnique: jest
      .fn()
      .mockImplementation(({ where: { id } }) =>
        Promise.resolve({ id, name: "John", email: "john@example.com" }),
      ),
    create: jest
      .fn()
      .mockImplementation(({ data }) => Promise.resolve({ id: "1", ...data })),
    update: jest
      .fn()
      .mockImplementation(({ where: { id }, data }) =>
        Promise.resolve({ id, ...data }),
      ),
    delete: jest
      .fn()
      .mockImplementation(({ where: { id } }) => Promise.resolve({ id })),
  },
};

describe("UsersService", () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be defined", () => {
    expect(prisma).toBeDefined();
  });

  it("should return all users", async () => {
    const users = await service.getUsers();
    expect(users).toEqual([
      { id: "1", name: "John", email: "john@example.com" },
    ]);
    expect(users).toHaveLength(1);
  });

  it("should return a user by id", async () => {
    const user = await service.getUser("1");

    expect(user).toEqual({ id: "1", name: "John", email: "john@example.com" });
  });

  it("should update a user by id", async () => {
    const user = {
      id: "1",
      name: "jane",
      email: "jane@example.com",
    };

    const result = await service.update(user);
    expect(result).toEqual(user);
  });

  it("should delete a user by id", async () => {
    const result = await service.delete("1");
    expect(result).toEqual({ id: "1" });
  });

  it("should not delete a user with wrong id", async () => {
    try {
      await service.delete("2");
    } catch (error: any) {
      expect(error.status).toBe(40)
    }
  });

  it("should not update a user with wrong id", async () => {
    const anotherUser = {
      id: "2",
      name: "jane",
      email: "jane@example.com",
    };

    try {
      await service.update(anotherUser);
    } catch (error: any) {
      expect(error.status).toBe(40)
    }
  })

  it("should create a user", async () => {
    const user = {
      name: "jane",
      email: "jane@example.com",
    };

    const result = await service.create(user);
    expect(result).toEqual({ id: "1", ...user });
  });
});
