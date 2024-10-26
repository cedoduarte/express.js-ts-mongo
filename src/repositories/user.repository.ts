import { User, IUser } from '../models/user.model';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class UserRepository {
  async findAll(): Promise<IUser[]> {
    return User.find();
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async create(user: IUser): Promise<IUser> {
    return User.create(user);
  }

  async update(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id);
  }
}
