import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateOrderItemDto {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    unitPrice: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    totalPrice: number;
}