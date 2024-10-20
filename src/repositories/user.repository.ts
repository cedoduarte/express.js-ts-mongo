import { User, IUser } from '../models/user.model';

export class UserRepository {
  async findAll(): Promise<IUser[]> {
    return User.find();
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
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
