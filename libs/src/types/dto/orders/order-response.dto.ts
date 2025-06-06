import { Exclude, Expose, Type } from 'class-transformer';
import { OrderItemResponseDto } from './order-item-response.dto';

@Exclude()
export class OrderResponseDto {
  @Expose()
  id: number;

  @Expose()
  totalPrice: number;

  @Expose()
  @Type(() => OrderItemResponseDto)
  items: OrderItemResponseDto[];

  @Expose()
  userId: number;
}

