import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class UpdateCartDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
}
