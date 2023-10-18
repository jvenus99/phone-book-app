import { PrismaUserRepository } from '../infra/prismaUserRepository';

export interface UpdateUserInput {
  id: number;
  name: string;
  lastName: string;
  phone: string;
}

export async function updateUser(
  prismaUserRepository: PrismaUserRepository,
  userId : number,
  input: UpdateUserInput
) {
  try {
    const user = await prismaUserRepository.updateUserById(userId, input);
    return user;
  } catch (error: any) {
    throw new Error('Erro ao atualizar o usuário: ' + error.message);
  }
}
