import { Controller, Get } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ORDER_KAFKA_EVENTS, OrderCreatedEvent } from '@ecommerce/types';

@Controller()
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @EventPattern(ORDER_KAFKA_EVENTS.ORDER_CREATED)
  async orderCreatedEventHandler(@Payload() orderCreatedEvent: OrderCreatedEvent) {
    await this.shippingService.orderCreatedEventHandler(orderCreatedEvent);
  }
}
