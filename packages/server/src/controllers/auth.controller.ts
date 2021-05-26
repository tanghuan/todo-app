import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';

@Controller()
export class AuthController {
  @Get('/refresh_token')
  refreshToken(): string {
    return 'OK';
  }

  @Get('/auth/github')
  @UseGuards(AuthGuard('github'))
  github(@Req() req: Request) {
    console.log('github user', req.user);
  }

  @Get('/auth/github/callback')
  @UseGuards(AuthGuard('github'))
  githubCallback(@Req() req: Request) {
    console.log('githubCallback user', req.user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@Req() req: Request) {
    console.log('profile user', req.user);
    return 'OK';
  }
}
