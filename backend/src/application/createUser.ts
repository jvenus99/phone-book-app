import { PrismaUserRepository } from '../infra/prismaUserRepository';

export interface CreateUserInput {
  name: string;
  lastName: string;
  phone: string;
}

export async function createUser(
  prismaUserRepository: PrismaUserRepository,
  input: CreateUserInput
) {
  try {
    const user = await prismaUserRepository.createUser(input);
    return user;
  } catch (error: any) {
    throw new Error('Erro ao criar o usuário: ' + error.message);
  }
}
