import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@ObjectType()
@Schema()
class Location {
  @Field()
  @Prop({ required: true })
  latitude: number;

  @Field()
  @Prop({ required: true })
  longitude: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

@ObjectType()
@Schema({ timestamps: true })
export class Vehicle {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  model: string;

  @Field()
  @Prop({ required: true })
  type: string;

  @Field()
  @Prop({ required: true })
  availabilityStatus: string;

  @Field()
  @Prop({ required: true })
  rentalPricePerHour: number;

  @Field(() => Location)
  @Prop({ type: LocationSchema, required: true })
  location: Location;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);