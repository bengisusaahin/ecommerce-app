import { IsEmail, IsNotEmpty, IsBoolean, IsEnum, IsDateString, IsString, MinLength, IsStrongPassword, IsOptional } from 'class-validator';
import { UserRole } from '../utils/types';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1,
    }, { message: "Password is not strong enough. It should have min 8 chars, at least one uppercase, one lowercase, one number and one symbol." })
    password: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @IsOptional()
    birthdate?: Date;
}
