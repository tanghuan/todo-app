import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

@ArgsType()
export class RegisterUser {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
