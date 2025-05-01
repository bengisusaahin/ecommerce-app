export enum UserRole {
  USER = 1,
  SELLER = 2,
  ADMIN = 3,
  SUPERADMIN = 4,
}

export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: UserRole;
  birthdate: string;
};
