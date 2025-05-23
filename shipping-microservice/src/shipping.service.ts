import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './events/order-created.event';

@Injectable()
export class ShippingService {
  orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    console.log('Order Created Event:', orderCreatedEvent);
  }
}
