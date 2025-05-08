import { UserRole } from "src/users/utils/types";

export interface JwtPayload {
    sub: number;
    email: string;
    role: UserRole;
  }
  