import { Resolver, Query, Context } from '@nestjs/graphql';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { AppService } from '../services/app.service';

@Resolver()
export class AppResolver {
  constructor(private appService: AppService) {}

  @Query(() => String)
  hello(@Context('req') req: Request): string {
    req.res?.cookie('jid', 'asdfasdfasdfasdf', {
      expires: new Date(Date.now() + 600),
      path: '/refresh_token',
      httpOnly: true,
    });
    return this.appService.getHello();
  }
}
