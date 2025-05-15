import { UserRole } from "src/utils/types";

export class UserDto {
  id: number;
  email: string;
  password: string;
  role: UserRole;
}