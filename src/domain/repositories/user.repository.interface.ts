import { User } from '../entities/user.entity';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User>;
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<void>;
}