import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CouponDocument = Coupon & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Coupon {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true, unique: true })
  code: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop({ required: true })
  discountPercentage: number;

  @Field()
  @Prop({ required: true })
  maxDiscountAmount: number;

  @Field()
  @Prop({ required: true })
  validFrom: Date;

  @Field()
  @Prop({ required: true })
  validTo: Date;

  @Field()
  @Prop({ required: true })
  status: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);