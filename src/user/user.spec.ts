import { PrismaClient, User } from "@prisma/client";
import request from "supertest";
import { App } from "../app";

describe("User", () => {
  let agent: request.SuperTest<request.Test>;
  let user: Omit<User, "id">;
  let prisma: PrismaClient;

  it("should return not found", async () => {
    const { statusCode } = await agent.get("/users/99");
    expect(statusCode).toBe(404);
  });

  it("should create a user", async () => {
    const { statusCode } = await agent.post("/users").send(user);
    expect(statusCode).toBe(201);
  });

  it("Should return bad request if user with given email already exists", async () => {
    const { statusCode } = await agent.post("/users").send(user);
    expect(statusCode).toBe(400);
  });

  it("should return a user", async () => {
    const { statusCode } = await agent.get("/users/1");
    expect(statusCode).toBe(200);
  });

  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  async function setup() {
    const { app, prismaClient } = App();
    prisma = prismaClient;

    await prisma.user.createMany({
      data: [
        { name: "Albert Einstein", email: "albert.einstein@gmail.com" },
        { name: "John", email: "john@gmail.com" },
      ],
    });

    agent = request(app);

    user = {
      email: "test@gmail.com",
      name: "Test User",
    };
  }
});
