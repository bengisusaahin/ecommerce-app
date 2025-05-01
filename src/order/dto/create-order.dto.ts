import { IsArray, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    userId: number;

    @IsArray()
    orderItems: CreateOrderItemDto[];

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    totalPrice: number;
}