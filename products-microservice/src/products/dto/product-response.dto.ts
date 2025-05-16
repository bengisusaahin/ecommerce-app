import { Expose, Type } from 'class-transformer';

class ProductImageResponseDto {
  @Expose()
  url: string;

  @Expose()
  index: number;
}

export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  stock: number;

  @Expose()
  isActive: boolean;

  @Expose()
  sellerId: number;

  @Expose()
  @Type(() => ProductImageResponseDto)
  images: ProductImageResponseDto[];

  constructor(partial: Partial<ProductResponseDto>) {
    Object.assign(this, partial);
  }
}
