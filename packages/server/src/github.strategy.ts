import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: '95ef54d49e0ad1f69a82',
      clientSecret: 'a10f92850eb8d2ee36b5a1270efd949bb95dc982',
      callbackURL: 'http://localhost:3000/auth/github',
      scope: 'user:email',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<void> {
    // console.log('github access_token:', accessToken);
    // console.log('github refreshToken:', refreshToken);
    // console.log('github profile:', profile);

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
