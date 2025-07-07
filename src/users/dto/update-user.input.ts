import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, MinLength, IsEmail, IsBoolean } from 'class-validator';
import { CreateUserDto } from './create-user.input';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  isActive?: boolean = true;
}