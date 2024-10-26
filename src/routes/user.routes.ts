import { Router } from 'express';
import { container } from '../config/inversify.config';
import { TYPES } from '../types/types';
import { UserController } from '../controllers/user.controller';
import authentication from '../middlewares/authentication.middleware';

const router = Router();
const userController = container.get<UserController>(TYPES.UserController);

router.get('/users', authentication, userController.getUsers.bind(userController));
router.get('/users/:id', authentication, userController.getUserById.bind(userController));
router.post('/users', userController.createUser.bind(userController));
router.put('/users/:id', authentication, userController.updateUser.bind(userController));
router.delete('/users/:id', authentication, userController.deleteUser.bind(userController));

export default router;