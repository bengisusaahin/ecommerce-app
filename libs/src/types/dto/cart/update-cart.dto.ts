import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
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
        description: 'New quantity of the product',
        example: 2,
        minimum: 1
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
}
