import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class ProductCommentDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    comment: string;

    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;
} 