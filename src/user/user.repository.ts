import { PrismaClient, User } from "@prisma/client";

export class UserRepository {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(user: User) {
    if (await this.findById(user.id)) return null;
    return this.prisma.user.create({ data: user });
  }
}
