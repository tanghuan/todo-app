import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { TokenVo } from 'src/token.vo';
import { RegisterUser } from '../args/register-user.args';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async register(@Args() args: RegisterUser): Promise<string> {
    return this.authService.register(args);
  }

  @Mutation(() => TokenVo)
  async login(
    @Context('req') req: Request,
    @Args() args: RegisterUser,
  ): Promise<TokenVo> {
    const vo = await this.authService.login(args);
    req.res.cookie('jid', vo.refresh_token, {
      expires: new Date(Date.now() + 6000),
      path: '/refresh_token',
      httpOnly: true,
    });
    delete vo.refresh_token;
    return vo;
  }

  @Mutation(() => TokenVo)
  @UseGuards(AuthGuard('github'))
  async authGithub() {
    console.log();
  }
}
