export const ORDER_PATTERNS = {
  FindAll: 'Orders.FindAll',
  FindOne: 'Orders.FindOne',
  FindByEmail: 'Orders.FindByEmail',
  Create: 'Orders.Create',
  Update: 'Orders.Update',
  Remove: 'Orders.Remove',
};

export const KAFKA_PATTERNS = {
  name: 'KAFKA_MICROSERVICE',
  host: 'kafka',
  port: 9092,
}

export const ORDER_KAFKA_EVENTS = {
  ORDER_CREATED: 'Order.Created',
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

