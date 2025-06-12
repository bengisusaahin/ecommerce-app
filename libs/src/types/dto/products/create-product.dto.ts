import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsArray,
    ValidateNested,
    IsPositive,
    Min,
    IsOptional,
    IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductImageDto {
    @ApiProperty({
        description: 'URL of the product image',
        example: 'https://example.com/images/product1.jpg'
    })
    @IsString()
    url: string;

    @ApiProperty({
        description: 'Display order of the image',
        example: 1,
        minimum: 0
    })
    @IsNumber()
    index: number;
}

export class CreateProductDto {
    @ApiProperty({
        description: 'Name of the product',
        example: 'iPhone 13 Pro',
        minLength: 1
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Detailed description of the product',
        example: 'Latest iPhone with A15 Bionic chip and Pro camera system'
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Price of the product',
        example: 999.99,
        minimum: 0
    })
    @IsNumber()
    @IsPositive()
    @Min(0)
    price: number;

    @ApiProperty({
        description: 'Available stock quantity',
        example: 100,
        minimum: 0
    })
    @IsNumber()
    @Min(0)
    stock: number;

    @ApiProperty({
        description: 'Whether the product is active',
        example: true,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @ApiProperty({
        description: 'ID of the seller',
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    seller_id: number;

    @ApiProperty({
        description: 'ID of the product category',
        example: 1,
        required: false
    })
    @IsOptional()
    @IsNumber()
    category_id?: number;

    @ApiProperty({
        description: 'Product rating',
        example: 4.5,
        required: false,
        minimum: 0,
        maximum: 5
    })
    @IsOptional()
    @IsNumber()
    rating?: number;

    @ApiProperty({
        description: 'Number of times the product has been sold',
        example: 50,
        required: false,
        minimum: 0
    })
    @IsOptional()
    @IsNumber()
    sell_count?: number;

    @ApiProperty({
        description: 'Product images',
        type: [ProductImageDto],
        example: [
            { url: 'https://example.com/images/product1.jpg', index: 0 },
            { url: 'https://example.com/images/product2.jpg', index: 1 }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductImageDto)
    images: ProductImageDto[];
}
