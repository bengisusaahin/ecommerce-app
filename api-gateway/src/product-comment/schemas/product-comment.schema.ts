import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductCommentDocument = ProductComment & Document;

@Schema({ timestamps: true })
export class ProductComment {
    @Prop({ required: true })
    productId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    comment: string;

    @Prop({ default: 0, min: 0, max: 5 })
    rating: number;
}

export const ProductCommentSchema =
    SchemaFactory.createForClass(ProductComment);
