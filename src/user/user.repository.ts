import { PrismaClient, User } from "@prisma/client";

export class UserRepository {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(user: User) {
    const userFromDatabase = await this.findByEmail(user.email);

    if (userFromDatabase) return { error: true, message: "User already exists." };
    return this.prisma.user.create({ data: user });
  }
}
