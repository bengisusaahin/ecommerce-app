import { Injectable } from '@nestjs/common';
import { MailService } from './mail/mail.service';
import { OrderCreatedEvent } from '@ecommerce/types';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailService: MailService) {}

  orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    console.log('Order Created Event:', orderCreatedEvent);
    this.mailService.sendOrderMail(orderCreatedEvent);
  }
}
