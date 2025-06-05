import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ORDER_KAFKA_EVENTS, OrderCreatedEvent } from '@ecommerce/types';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern(ORDER_KAFKA_EVENTS.ORDER_CREATED)
  async orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    await this.notificationsService.orderCreatedEventHandler(orderCreatedEvent);
  }
}
