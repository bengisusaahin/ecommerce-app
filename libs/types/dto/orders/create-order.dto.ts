import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    userId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    totalPrice: number;
}
