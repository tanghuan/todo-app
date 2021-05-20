import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterUser } from '../register-user.args';
import { User } from '../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    return Promise.resolve({
      accessToken: 'asdfasdfasdfasdfasdfasdf',
      refreshToken: '1264767675657676767',
    });
  }

  async register(args: RegisterUser): Promise<string> {
    console.log('args: ', args);

    const { username, password } = args;

    const user = new User();
    user.username = username;
    user.password = password;

    await this.userRepository.save(user);
    return 'OK';
  }
}
