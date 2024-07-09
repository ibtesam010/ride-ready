import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AuthDocument = Auth & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Auth {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  provider: string;

  @Field({ nullable: true })
  @Prop()
  passwordHash?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);