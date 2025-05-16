import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
  })
  items: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
