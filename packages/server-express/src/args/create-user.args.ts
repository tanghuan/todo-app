import { ArgsType, Field } from 'type-graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@ArgsType()
export class CreateUserArgs {
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  username: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
