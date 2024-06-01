import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async updateUser(id: number, user: User): Promise<User> {
    return this.userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}