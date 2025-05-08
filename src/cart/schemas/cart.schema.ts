import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [{
      productId: String,
      quantity: Number,
      price: Number,
    }],
  })
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
