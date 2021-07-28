import express, { Router } from "express";
import { userRoutes } from "./user/user.router";

const app = express();
const port = process.env.PORT || 3000;
import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./user/user.repository";

const prisma = new PrismaClient();
const router = Router();

const routes = userRoutes(new UserRepository(prisma));
routes(router);

app.use("users", router);

// default route
app.use(function (_req, res) {
  res.status(419).send("I'm a teapot");
});

console.log(`Listening on port ${port}`);
app.listen(port);
