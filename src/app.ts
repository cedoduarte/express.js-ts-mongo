import express from 'express';
import cors from 'cors';
import { environment } from './config/environment';
import { logger } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error-handler.middleware';
import { authorization } from './middlewares/authorization.middleware';
import { UserController } from './controllers/user.controller';
import 'reflect-metadata';
import { container } from './config/inversify.config';
import { TYPES } from './types/types';


const app = express();
const userController = container.get<UserController>(TYPES.UserController);

app.use(cors({ origin: environment.FRONTEND_URL }));
app.use(express.json());
app.use(logger);

// Rutas de usuarios
app.get('/users', authorization, userController.getUsers.bind(userController));
app.get('/users/:id', authorization, userController.getUserById.bind(userController));
app.post('/users', authorization, userController.createUser.bind(userController));
app.put('/users/:id', authorization, userController.updateUser.bind(userController));
app.delete('/users/:id', authorization, userController.deleteUser.bind(userController));

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
