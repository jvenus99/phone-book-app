import express from 'express';
import { UserController } from './controllers/userController';

const router = express.Router();
const userController = new UserController();

router.post('/users', (req, res) => userController.createUser(req, res));

router.put('/users/:id', (req, res) => userController.updateUser(req, res));

router.get('/users', (req, res) => userController.getUsers(req, res));

router.delete('/users/:id', (req, res) => userController.deleteUserById(req, res));

export default router;
