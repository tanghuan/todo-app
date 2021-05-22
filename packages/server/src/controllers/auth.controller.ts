import { Controller, Get, Req } from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';

@Controller()
export class AuthController {
  @Get('/refresh_token')
  refreshToken(@Req() req: Request): string {
    console.log('req ======> ', req.cookies);
    return 'OK';
  }
}
