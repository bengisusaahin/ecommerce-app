import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShippingDocument = Shipping & Document;

export enum ShippingStatus {
    PENDING = 'pending',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
}

@Schema({ timestamps: true })
export class Shipping {
    @Prop({ required: true, unique: true })
    orderId: number;

    @Prop({ required: true, enum: ShippingStatus, default: ShippingStatus.PENDING })
    status: ShippingStatus;

    @Prop({ type: [{ productId: Number, quantity: Number }] })
    items: { productId: number; quantity: number }[];

    @Prop({ required: true })
    trackingNumber: string;

    @Prop({ required: true })
    estimatedDeliveryDate: Date;
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
