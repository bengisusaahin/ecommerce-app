import { UserRole } from "../types/enums/user-role.enum";

export interface JwtPayload {
    sub: number;
    email: string;
    role: UserRole;
}