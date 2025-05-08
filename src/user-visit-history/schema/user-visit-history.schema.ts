import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserVisitHistoryDocument = UserVisitHistory & Document;

@Schema({ timestamps: true })
export class UserVisitHistory {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    productId: string;

    @Prop({ required: true, default: Date.now })
    visitedAt: Date;
}

export const UserVisitHistorySchema =
    SchemaFactory.createForClass(UserVisitHistory);
