import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '../../enums/user-role.enum';

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
  @Exclude()
  password: string;
}
