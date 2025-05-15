export const USER_PATTERNS = {
    FindAll: 'Users.FindAll',
    FindOne: 'Users.FindOne',
    FindByEmail: 'Users.FindByEmail',
    Create: 'Users.Create',
    Update: 'Users.Update',
    Remove: 'Users.Remove',
};

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  SELLER = "SELLER",
  GUEST = "GUEST"
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortOrder
}

export type SortOrder = "ASC" | "DESC";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}