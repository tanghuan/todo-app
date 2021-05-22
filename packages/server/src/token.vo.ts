import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenVo {
  @Field()
  access_token: string;

  refresh_token: string;
}
