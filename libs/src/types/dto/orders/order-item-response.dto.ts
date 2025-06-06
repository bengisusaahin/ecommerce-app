import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OrderItemResponseDto {
  @Expose()
  id: number;

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  @Expose()
  totalPrice: number;

  @Expose()
  productId: number;

  constructor(partial: Partial<OrderItemResponseDto>) {
    Object.assign(this, partial);
  }
}
