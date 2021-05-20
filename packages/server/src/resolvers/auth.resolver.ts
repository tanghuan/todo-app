import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { RegisterUser } from '../register-user.args';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(@Context('req') req: Request): Promise<string> {
    const { accessToken, refreshToken } = await this.authService.login();
    req.res.cookie('jid', refreshToken, {
      path: '/refresh_token',
    });
    return accessToken;
  }

  @Mutation(() => String)
  async register(@Args() args: RegisterUser): Promise<string> {
    return this.authService.register(args);
  }
}
