import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class ProductCommentDto {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsString()
    comment: string;

    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;

}
