import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  @Get('/refresh_token')
  refreshToken(): string {
    return 'OK';
  }

  @Get('/auth/github')
  @UseGuards(AuthGuard('github'))
  github() {}

  @Get('/auth/github/callback')
  @UseGuards(AuthGuard('github'))
  githubCallback() {}
}
