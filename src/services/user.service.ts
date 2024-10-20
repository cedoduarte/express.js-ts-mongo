import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';

@injectable()
export class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    return this.userRepository.create(createUserDto as IUser);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser | null> {
    return this.userRepository.update(id, updateUserDto);
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return this.userRepository.delete(id);
  }
}
