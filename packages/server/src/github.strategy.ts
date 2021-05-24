import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: 'clientID',
      clientSecret: 'clientSecret',
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: 'user:email',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    console.log('github access_token:', accessToken);
    console.log('github refreshToken:', refreshToken);
    console.log('github profile:', profile);

    const { username, emails } = profile;

    const user = {
      email: emails[0]?.value,
      username,
    };
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
