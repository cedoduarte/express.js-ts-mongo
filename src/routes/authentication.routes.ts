import { Router } from 'express';
import { container } from '../config/inversify.config';
import { TYPES } from '../types/types';
import { AuthenticationController } from '../controllers/authentication.controller';

const router = Router();
const authenticationController = container.get<AuthenticationController>(TYPES.AuthenticationController);

router.post('/authenticate', authenticationController.authenticate.bind(authenticationController));

export default router;