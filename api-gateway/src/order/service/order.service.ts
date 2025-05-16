import { Get, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_PATTERNS, PaginationParams } from '../utils/types';

@Injectable()
export class OrderService {
    constructor(
        @Inject('ORDERS_MICROSERVICE')
        private readonly ordersMicroservice: ClientProxy,
    ) { }

    create(createOrderDto: CreateOrderDto) {
        return this.ordersMicroservice.send({ cmd: ORDER_PATTERNS.Create }, createOrderDto);
    }

    findAll(params: PaginationParams) {
        return this.ordersMicroservice.send({ cmd: ORDER_PATTERNS.FindAll }, params);
    }

    findOne(id: number) {
        return this.ordersMicroservice.send({ cmd: ORDER_PATTERNS.FindOne }, { id });
    }

    update(id: number, dto: UpdateOrderDto) {
        return this.ordersMicroservice.send({ cmd: ORDER_PATTERNS.Update }, { id, dto });
    }

    remove(id: number) {
        return this.ordersMicroservice.send({ cmd: ORDER_PATTERNS.Remove }, { id });
    }
}
