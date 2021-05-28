import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: 'clientID',
      clientSecret: 'clientSecret',
      callbackURL: 'http://localhost:3000/auth/google',
      scope: ['profile', 'email'],
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
    // console.log('google profile:', profile);

    const {
      id,
      name: { familyName, givenName },
      emails,
    } = profile;

    const payload = {
      id,
      email: emails[0]?.value,
      username: `${familyName}${givenName}`,
    };

    done(null, payload);
  }
}
