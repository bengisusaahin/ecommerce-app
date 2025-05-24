import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderCreatedEvent } from './events/order-created.event';
import { Shipping, ShippingDocument, ShippingStatus } from './schema/shipping.schema';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_PATTERNS, SHIPPING_PATTERNS } from './util/types';

@Injectable()
export class ShippingService implements OnModuleInit {
  constructor(
    @InjectModel(Shipping.name)
    private shippingModel: Model<ShippingDocument>,
    @Inject(KAFKA_PATTERNS.name)
    private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.kafkaClient.connect();
  }

  async orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent): Promise<void> {
    const shipping = new this.shippingModel({
      orderId: orderCreatedEvent.orderId,
      status: ShippingStatus.PENDING,
      items: orderCreatedEvent.items,
      trackingNumber: `TRK-${Date.now()}`, 
      estimatedDeliveryDate: new Date(Date.now()+ 7 * 24 * 60 * 60 * 1000), 
    });

    const savedShipping = await shipping.save();

    console.log(`Shipping record created for order ${orderCreatedEvent.orderId}`);

    this.kafkaClient.emit(SHIPPING_PATTERNS.ORDER_SHIPPING_CREATED, {
      orderId: savedShipping.orderId,
      shippingId: savedShipping._id,
      trackingNumber: savedShipping.trackingNumber,
      status: savedShipping.status,
      estimatedDeliveryDate: savedShipping.estimatedDeliveryDate
    });
  }
}
