import e from 'express';
import { UserRole } from '../utils/types';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  birthdate: Date;
  role: UserRole;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

export class UserDto extends UserResponseDto {
  password: string;
}
