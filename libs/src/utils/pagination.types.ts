export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortOrder
}

export interface SearchablePaginationParams extends PaginationParams {
  search?: string;
}

export type SortOrder = "ASC" | "DESC";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}