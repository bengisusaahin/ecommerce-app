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

class ProductImageDto {
    @IsString()
    url: string;

    @IsNumber()
    index: number;
}

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNumber()
    @IsPositive()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsOptional()
    @IsBoolean()
    is_active: boolean;

    @IsNotEmpty()
    @IsNumber()
    seller_id: number;

    @IsNumber()
    category_id: number;

    @IsNumber()
    rating: number;

    @IsNumber()
    sell_count: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductImageDto)
    images: ProductImageDto[];
}
