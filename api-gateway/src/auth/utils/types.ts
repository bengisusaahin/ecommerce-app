import { UserRole } from "src/products/utils/types";

export const AUTH_PATTERNS = {
  Login: 'Auth.Login',
  Verify: 'Auth.Verify',
};

export interface JwtPayload {
    sub: number;
    email: string;
    role: UserRole;
}
