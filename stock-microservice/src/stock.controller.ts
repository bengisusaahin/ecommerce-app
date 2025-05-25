import { Controller } from '@nestjs/common';
import { StockService } from './stock.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { STOCK_PATTERNS } from './util/types';
import { OrderCreatedEvent } from './events/order-created.event';

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @EventPattern(STOCK_PATTERNS.ORDER_CREATED)
  async handleOrderCreated(@Payload() orderCreatedEvent: OrderCreatedEvent) {
    await this.stockService.decreaseStock(orderCreatedEvent.items);
  }
}
