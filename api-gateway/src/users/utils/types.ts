export const USER_PATTERNS = {
    FindAll: 'Users.FindAll',
    FindOne: 'Users.FindOne',
    FindByEmail: 'Users.FindByEmail',
    Create: 'Users.Create',
    Update: 'Users.Update',
    Remove: 'Users.Remove',
};

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortOrder
}

export type SortOrder = "ASC" | "DESC";