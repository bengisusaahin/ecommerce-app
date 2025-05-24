import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderCreatedEvent } from './events/order-created.event';
import { Shipping, ShippingDocument, ShippingStatus } from './schema/shipping.schema';

@Injectable()
export class ShippingService {
  constructor(
    @InjectModel(Shipping.name)
    private shippingModel: Model<ShippingDocument>,
  ) {}

  async orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    const shipping = new this.shippingModel({
      orderId: orderCreatedEvent.orderId,
      status: ShippingStatus.PENDING,
      items: orderCreatedEvent.items,
    });
    await shipping.save();

    console.log(`Shipping record created for order ${orderCreatedEvent.orderId}`);
  }
}
