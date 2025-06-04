export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  SELLER = "SELLER",
  GUEST = "GUEST"
}

export type ProductImage = {
    url: string;
    index: number;
  };
  
  export type ProductType = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    store_id: number;
    category_id: number;
    rating: number;
    sell_count: number;
    images: ProductImage[];
  };
  
  export const PRODUCT_PATTERNS = {
  FindAll: 'Products.FindAll',
  FindBySeller: 'Products.FindBySeller',
  FindOne: 'Products.FindOne',
  Create: 'Products.Create',
  Update: 'Products.Update',
  Remove: 'Products.Remove',
};

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortOrder,
  search?: string;
}

//TODO searcable pagination params

export type SortOrder = "ASC" | "DESC";