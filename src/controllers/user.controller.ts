import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';

@injectable()
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  async getUsers(_req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    const user = await this.userService.getUserById(req.params.id);
    res.json(user);
  }

  async createUser(req: Request, res: Response) {
    const createUserDto = plainToClass(CreateUserDto, req.body);
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors
      });
    } else {
      const user = await this.userService.createUser(createUserDto);
      res.status(201).json(user);
    }
  }

  async updateUser(req: Request, res: Response) {
    const updateUserDto = plainToClass(UpdateUserDto, req.body);
    const errors = await validate(updateUserDto);
    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors
      });
    } else {
      const user = await this.userService.updateUser(req.params.id, updateUserDto);
      res.json(user);
    }
  }

  async deleteUser(req: Request, res: Response) {
    await this.userService.deleteUser(req.params.id);
    res.status(204).send();
  }
}
