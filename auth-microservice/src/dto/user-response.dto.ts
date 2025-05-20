import { Expose } from 'class-transformer';
import { UserRole } from '../utils/types';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

  @Expose()
  birthdate: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

export class UserDto extends UserResponseDto {
  @Expose()
  password: string;
}
