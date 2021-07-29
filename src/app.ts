import express, { Router } from "express";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";

import { userRoutes } from "./user/user.router";
import { UserRepository } from "./user/user.repository";

dotenv.config();

export function App() {
  const app = express();
  const prismaClient = new PrismaClient();
  const router = Router();
  const routes = userRoutes(new UserRepository(prismaClient));

  prismaClient.$connect();
  routes(router);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/users", router);

  // default route
  app.use(function (_req, res) {
    res.status(419).send("I'm a teapot");
  });

  return { app, prismaClient };
}

export default App;
