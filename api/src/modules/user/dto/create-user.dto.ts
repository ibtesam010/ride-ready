import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Field()
  phoneNumber?: string;
}
