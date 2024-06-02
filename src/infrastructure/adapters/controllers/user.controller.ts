import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../../../application/services/user.service';
import { User } from '../../../domain/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  async create(@Body() createUserDto: { name: string, email: string }): Promise<User> {
    return this.userService.createUser(createUserDto.name, createUserDto.email);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: { name: string, email: string }): Promise<User> {
    return this.userService.updateUser(id, updateUserDto.name, updateUserDto.email);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}