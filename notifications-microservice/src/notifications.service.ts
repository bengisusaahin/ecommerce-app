import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './events/order-created.event';

@Injectable()
export class NotificationsService {

  orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    console.log('Order Created Event:', orderCreatedEvent);
    //TODO: order ile ilgili mail gönderme işlemi
  }
}
