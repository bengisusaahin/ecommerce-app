import { IsEmail, IsNotEmpty, IsBoolean, IsEnum, IsDateString, IsString, MinLength } from 'class-validator';
import { UserRole } from '../utils/types';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @Exclude()
    password: string;

    @IsBoolean()
    isActive: boolean;

    @IsEnum(UserRole)
    role: UserRole;

    @IsDateString()
    birthdate: string;
}