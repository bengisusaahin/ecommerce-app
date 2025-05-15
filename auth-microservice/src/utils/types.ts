export const AUTH_PATTERNS = {
    Login: 'Auth.Login',
    Verify: 'Auth.Verify',
};

export type JwtPayload = {
    sub : number;
    email : string;
    role : UserRole;
};

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  SELLER = "SELLER",
  GUEST = "GUEST"
}