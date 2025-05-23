import { Controller, Get } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { EventPattern } from '@nestjs/microservices';
import { SHIPPING_PATTERNS } from './util/types';
import { OrderCreatedEvent } from './events/order-created.event';

@Controller()
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @EventPattern(SHIPPING_PATTERNS.SHIPPING_CREATED)
  async orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    await this.shippingService.orderCreatedEventHandler(orderCreatedEvent);
  }
}
