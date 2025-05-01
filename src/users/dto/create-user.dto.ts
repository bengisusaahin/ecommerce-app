import { IsEmail, IsNotEmpty, IsBoolean, IsEnum, IsDateString, IsString, MinLength } from 'class-validator';
import { UserRole } from '../utils/types';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsBoolean()
    isActive: boolean;

    @IsEnum(UserRole)
    role: UserRole;

    @IsDateString()
    birthdate: string;
}