import { Request, Router } from "express";
import { UserRepository } from "./user.repository";

export const userRoutes = (repository: UserRepository) => {
  return (router: Router) => {
    router.route("/").get(async ({ params: { id } }: Request & { params: { id: number } }, res) => {
      const user = await repository.findById(id);
      res.json(user);
    });

    router.route("/").post(async (req: Request, res) => {
      const userData = req.body;
      const userFromDatabase = await repository.findById(userData.id);
      if (userFromDatabase) {
        res.status(400).send("User already exists");
      }
      const user = await repository.create(userData);
      res.json(user);
    });
  };
};
