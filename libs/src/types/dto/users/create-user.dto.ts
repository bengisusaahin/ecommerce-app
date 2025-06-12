import { IsEmail, IsNotEmpty, IsBoolean, IsEnum, IsString, IsStrongPassword, IsOptional } from 'class-validator';
import { UserRole } from '../../enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
        required: true
    })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
        required: true
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user. Must be strong with minimum 8 characters, at least one uppercase, one lowercase, one number and one symbol',
        example: 'StrongP@ss123',
        required: true
    })
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1,
    }, { message: "Password is not strong enough. It should have min 8 chars, at least one uppercase, one lowercase, one number and one symbol." })
    password: string;

    @ApiProperty({
        description: 'Whether the user account is active',
        example: true,
        required: false,
        default: true
    })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @ApiProperty({
        description: 'The role of the user',
        enum: UserRole,
        example: UserRole.USER,
        required: false,
        default: UserRole.USER
    })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @ApiProperty({
        description: 'The birthdate of the user',
        example: '1990-01-01',
        required: false,
        type: Date
    })
    @IsOptional()
    birthdate?: Date;
}
