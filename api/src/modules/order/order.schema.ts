import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OrderDocument = Order & Document;

@ObjectType()
@Schema()
class PaymentDetails {
  @Field()
  @Prop({ required: true })
  paymentMethod: string;

  @Field()
  @Prop({ required: true })
  transactionId: string;

  @Field()
  @Prop({ required: true })
  amount: number;

  @Field()
  @Prop({ required: true })
  paymentStatus: string;
}

export const PaymentDetailsSchema = SchemaFactory.createForClass(PaymentDetails);

@ObjectType()
@Schema({ timestamps: true })
export class Order {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vehicle', required: true })
  vehicleId: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  startTime: Date;

  @Field()
  @Prop({ required: true })
  endTime: Date;

  @Field()
  @Prop({ required: true })
  totalAmount: number;

  @Field()
  @Prop({ required: true })
  status: string;

  @Field(() => PaymentDetails)
  @Prop({ type: PaymentDetailsSchema, required: true })
  paymentDetails: PaymentDetails;

  @Field({ nullable: true })
  @Prop()
  couponCode?: string;

  @Field({ nullable: true })
  @Prop()
  discountAmount?: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);