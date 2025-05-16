export const ORDER_PATTERNS = {
  FindAll: 'Orders.FindAll',
  FindOne: 'Orders.FindOne',
  FindByEmail: 'Orders.FindByEmail',
  Create: 'Orders.Create',
  Update: 'Orders.Update',
  Remove: 'Orders.Remove',
};

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortOrder
}

export type SortOrder = "ASC" | "DESC";