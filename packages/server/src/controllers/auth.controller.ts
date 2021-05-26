import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/refresh_token')
  refreshToken(): string {
    return 'OK';
  }

  @Get('/auth/github')
  @UseGuards(AuthGuard('github'))
  async github(@Req() req: Request) {
    console.log('github user', req.user);
    const vo = await this.authService.github(req.user);
    req.res.cookie('jid', vo.refresh_token, {
      expires: new Date(Date.now() + 6000),
      path: '/refresh_token',
      httpOnly: true,
    });
    delete vo.refresh_token;
    return vo;
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@Req() req: Request) {
    console.log('profile user', req.user);
    return 'OK';
  }
}
