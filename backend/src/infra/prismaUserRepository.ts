import { PrismaClient } from '../../prisma/client'
import { CreateUserInput } from '../application/createUser';
import { User } from '../domain/User';

export class PrismaUserRepository {
  constructor(private prisma: PrismaClient) {}

  async createUser(input: CreateUserInput) {
    return this.prisma.user.create({
      data: input,
    });
  }

  async updateUserById(id: number, userData: User): Promise<User | null> {
    return await this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async getUsers(lastName?: string) {
    const users = await this.prisma.user.findMany({
      where: {
        lastName: {
          contains: lastName,
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    return users;
  }

  async deleteUserById(userId: number) {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
