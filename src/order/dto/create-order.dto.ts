import { IsArray, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    userId: number;

    @IsArray()
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    totalPrice: number;
}