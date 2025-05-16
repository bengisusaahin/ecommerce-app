import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDER_PATTERNS } from './utils/types';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({ cmd: ORDER_PATTERNS.Create })
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern({ cmd: ORDER_PATTERNS.FindAll })
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern({ cmd: ORDER_PATTERNS.FindOne })
  findOne(@Payload() id: number) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern({ cmd: ORDER_PATTERNS.Update })
  updateOrder(@Payload() data: { id: number; dto: any }) {
    return this.ordersService.update(data.id, data.dto);
  }

  @MessagePattern({ cmd: ORDER_PATTERNS.Remove })
  remove(@Payload() id: number) {
    return this.ordersService.remove(id);
  }
}
