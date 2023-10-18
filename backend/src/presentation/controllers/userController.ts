import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/prismaUserRepository';
import { createUser } from '../../application/createUser';
import { deleteUserById } from '../../application/deleteUser';
import { PrismaClient } from '../../../prisma/client';
import { updateUser } from '../../application/updateUser';
import { getUsers } from '../../application/getUsers';

export class UserController {
  private prisma: PrismaClient;
  private userRepository: PrismaUserRepository;

  constructor() {
    this.prisma = new PrismaClient();
    this.userRepository = new PrismaUserRepository(this.prisma);
  }

  async createUser(req: Request, res: Response) {
    const { name, lastName, phone } = req.body;

    try {
      const user = await createUser(this.userRepository, { name, lastName, phone });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error to create user' });
    }
  }

  async updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const {name, lastName, phone } = req.body;

    try{
      const user = await updateUser(this.userRepository, userId, { id: userId, name, lastName, phone })
      res.status(200).json(user);
    }catch(error){
      res.status(500).json({ message: 'Error to update user' });
    }
  }

  async getUsers(req: Request, res: Response) {
    const { lastName } = req.query;

    try {
      const users = await getUsers(this.userRepository, lastName as string);

      res.json(users);
    } catch (error) {
      console.error('Error to get users:', error);
      res.status(500).json({ message: 'Error to get users' });
    }
  }

  async deleteUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id);

    try {
      await deleteUserById(this.userRepository, userId);
      res.json({ message: 'User deleted' });
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  }
}
