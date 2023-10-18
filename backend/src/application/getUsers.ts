import { PrismaUserRepository } from "../infra/prismaUserRepository";

export async function getUsers(
  prismaUserRepository: PrismaUserRepository,
  lastName?: string
) {
  const users = await prismaUserRepository.getUsers(lastName);
  return users;
}
