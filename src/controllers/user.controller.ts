import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UserController {
  private userService = new UserService();

  async getUsers(_req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    const user = await this.userService.getUserById(req.params.id);
    res.json(user);
  }

  async createUser(req: Request, res: Response) {
    const createUserDto: CreateUserDto = req.body;
    const user = await this.userService.createUser(createUserDto);
    res.status(201).json(user);
  }

  async updateUser(req: Request, res: Response) {
    const updateUserDto: UpdateUserDto = req.body;
    const user = await this.userService.updateUser(req.params.id, updateUserDto);
    res.json(user);
  }

  async deleteUser(req: Request, res: Response) {
    await this.userService.deleteUser(req.params.id);
    res.status(204).send();
  }
}
