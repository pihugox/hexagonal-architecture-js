import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map(user => new User(user.id, user.name, user.email));
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;
    return new User(user.id, user.name, user.email);
  }

  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    const result = await this.userRepository.save(newUser);
    return new User(result.id, result.name, result.email);
  }

  async update(id: number, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return new User(updatedUser.id, updatedUser.name, updatedUser.email);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}