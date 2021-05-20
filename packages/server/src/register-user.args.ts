import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RegisterUser {
  @Field()
  username: string;

  @Field()
  password: string;
}
