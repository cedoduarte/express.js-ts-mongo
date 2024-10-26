import { Container } from 'inversify';
import { TYPES } from '../types/types';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationController } from '../controllers/authentication.controller';

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);

container.bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationService);
container.bind<AuthenticationController>(TYPES.AuthenticationController).to(AuthenticationController);

export { container };