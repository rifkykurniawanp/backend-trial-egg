import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.input';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.listUsers();
    return plainToInstance(User, users, { excludeExtraneousValues: true });
  }

  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    const userByUsername = await this.usersService.userByUsername(username);
    if (!userByUsername) {
      throw new Error('User not found');
    }
    return plainToInstance(User, userByUsername, { excludeExtraneousValues: true });
  }

  @Post()
  async createUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ) {
    const newUser = await this.usersService.createUser(createUserDto);
    return plainToInstance(User, newUser, { excludeExtraneousValues: true });
  }
}
