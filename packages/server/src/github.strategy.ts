import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: '95ef54d49e0ad1f69a82',
      clientSecret: '87ecf52a64b188dc93a12ab476515d5041f9b8b1',
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

    const { id, username, emails } = profile;

    const payload = {
      id,
      email: emails[0]?.value,
      username,
    };

    done(null, payload);
  }
}
