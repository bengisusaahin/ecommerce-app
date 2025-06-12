import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({
        description: 'User ID',
        example: 1,
        minimum: 1
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        description: 'Order items',
        type: [CreateOrderItemDto],
        example: [
            {
                productId: 1,
                quantity: 2,
                unitPrice: 99.99,
                totalPrice: 199.98
            }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];

    @ApiProperty({
        description: 'Total price of the order',
        example: 199.98,
        minimum: 0
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    totalPrice: number;
}
