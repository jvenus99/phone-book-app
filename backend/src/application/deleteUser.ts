import { PrismaUserRepository } from '../infra/prismaUserRepository';

export async function deleteUserById(
  prismaUserRepository: PrismaUserRepository,
  userId: number
) {
  const user = await prismaUserRepository.deleteUserById(userId);
  return user;
}