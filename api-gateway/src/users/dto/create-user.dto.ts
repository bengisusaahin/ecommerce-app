import { IsEmail, IsNotEmpty, IsBoolean, IsEnum, IsString, IsStrongPassword, IsOptional } from 'class-validator';
import { UserRole } from 'src/products/utils/types';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1,
    })
    password: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @IsOptional()
    birthdate?: string;
}
