import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './events/order-created.event';
import { MailService } from './mail/mail.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailService: MailService) {}

  orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    console.log('Order Created Event:', orderCreatedEvent);
    this.mailService.sendOrderMail(orderCreatedEvent);
  }
}
