import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
    @ApiProperty({
        description: 'User ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'Product ID',
        example: '123e4567-e89b-12d3-a456-426614174001'
    })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({
        description: 'Product name',
        example: 'iPhone 13 Pro'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Product price',
        example: 999.99,
        minimum: 0
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @ApiProperty({
        description: 'Quantity of the product',
        example: 1,
        minimum: 1
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
}
