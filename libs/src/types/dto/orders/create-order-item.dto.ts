import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
    @ApiProperty({
        description: 'Product ID',
        example: 1,
        minimum: 1
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({
        description: 'Quantity of the product',
        example: 2,
        minimum: 1
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({
        description: 'Unit price of the product',
        example: 99.99,
        minimum: 0
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    unitPrice: number;

    @ApiProperty({
        description: 'Total price for this item (quantity * unitPrice)',
        example: 199.98,
        minimum: 0
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    totalPrice: number;
}