import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
class Address {
  @Field()
  @Prop({ required: true })
  street: string;

  @Field()
  @Prop({ required: true })
  city: string;

  @Field()
  @Prop({ required: true })
  state: string;

  @Field()
  @Prop({ required: true })
  postalCode: string;

  @Field()
  @Prop({ required: true })
  country: string;

  @Field()
  @Prop({ required: true })
  latitude: number;

  @Field()
  @Prop({ required: true })
  longitude: number;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  firstName: string;

  @Field()
  @Prop({ required: true })
  lastName: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field({ nullable: true })
  @Prop()
  phoneNumber?: string;

  @Field(() => [Address])
  @Prop({ type: [AddressSchema], required: true })
  addresses: Address[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
