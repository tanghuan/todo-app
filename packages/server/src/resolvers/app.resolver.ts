import { Resolver, Query, Context } from '@nestjs/graphql';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { AppService } from '../services/app.service';

@Resolver()
export class AppResolver {
  constructor(private appService: AppService) {}

  @Query(() => String)
  hello(@Context('req') req: Request, @Context('res') res: Response): string {
    req.res?.cookie('test-token', Date.now(), {
      expires: new Date(Date.now() + 10000),
      httpOnly: true,
    });
    res?.cookie('signed_at', Date.now(), {
      expires: new Date(Date.now() + 10000),
      httpOnly: true,
    });
    res?.cookie('RToken', Date.now(), {
      expires: new Date(Date.now() + 10000),
      path: '/refresh_token',
      httpOnly: true,
    });
    return this.appService.getHello();
  }
}
