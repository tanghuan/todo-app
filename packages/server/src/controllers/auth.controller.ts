import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthController {
  @Get('/refresh_token')
  refreshToken(): string {
    return 'OK';
  }
}
