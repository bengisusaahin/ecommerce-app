import { IsEmail, IsNotEmpty, IsBoolean, IsEnum, IsDateString, IsString } from 'class-validator';
import { UserRole } from '../utils/types';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsBoolean()
    isActive: boolean;

    @IsEnum(UserRole)
    role: UserRole;

    @IsDateString()
    birthdate: string;
}