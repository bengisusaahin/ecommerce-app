export enum UserRole {
    USER = 1,
    ADMIN = 2,
    SUPERADMIN = 3,
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
  