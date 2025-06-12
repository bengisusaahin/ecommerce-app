import { IsArray, IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'Order items to update',
    type: [CreateOrderItemDto],
    required: false,
    example: [
      {
        productId: 1,
        quantity: 3,
        unitPrice: 99.99,
        totalPrice: 299.97
      }
    ]
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems?: CreateOrderItemDto[];

  @ApiProperty({
    description: 'Updated total price of the order',
    example: 299.97,
    required: false,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalPrice?: number;
}

