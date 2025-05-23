import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderCreatedEvent } from './events/order-created.event';
import { NOTIFICATION_PATTERNS } from './utils/types';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern(NOTIFICATION_PATTERNS.NOTIFICATION_CREATED)
  async orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    await this.notificationsService.orderCreatedEventHandler(orderCreatedEvent);
  }
}
