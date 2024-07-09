import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class SignInDto {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;
}

@InputType()
export class SignUpDto {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Field()
  password?: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  provider: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: true })
  phoneNumber?: string;
}
