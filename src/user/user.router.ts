import { Request, Router } from "express";
import { UserRepository } from "./user.repository";

export const userRoutes = (repository: UserRepository) => {
  return (router: Router) => {
    router.get("/:id", async ({ params: { id } }: Request & { params: { id: number } }, res) => {
      const user = await repository.findById(Number(id));
      if (!user) res.status(404).send("User not found");
      else res.json(user);
    });

    router.post("/", async ({ body }: Request, res) => {
      const user = await repository.create(body);
      if ("error" in user) res.status(400).json(user);
      else res.status(201).json(user);
    });

    return router;
  };
};
