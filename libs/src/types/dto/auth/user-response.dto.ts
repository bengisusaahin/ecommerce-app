import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '../../enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe'
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com'
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: UserRole,
    example: UserRole.USER
  })
  @Expose()
  role: UserRole;

  @ApiProperty({
    description: 'The birthdate of the user',
    example: '1990-01-01',
    type: Date
  })
  @Expose()
  birthdate: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

export class UserDto extends UserResponseDto {
  @Exclude()
  password: string;
}
