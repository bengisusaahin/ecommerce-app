import { Controller } from '@nestjs/common';
import { StockService } from './stock.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ORDER_KAFKA_EVENTS, OrderCreatedEvent } from '@ecommerce/types';

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @EventPattern(ORDER_KAFKA_EVENTS.ORDER_CREATED)
  async handleOrderCreated(@Payload() orderCreatedEvent: OrderCreatedEvent) {
    await this.stockService.decreaseStock(orderCreatedEvent.items);
  }
}
