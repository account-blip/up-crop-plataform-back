import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  import { USER_ROLES } from '../entities/user.entity';
  import type { UserRole } from '../entities/user.entity';
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    firstName: string;
  
    @IsString()
    @IsNotEmpty()
    lastName: string;
  
    @IsString()
    @IsOptional()
    password: string;
  
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @IsString()
    @IsOptional()
    emailVerified: string;
  
    @IsEnum(USER_ROLES)
    role: UserRole;

    @IsString()
    campoId: string
  }
  