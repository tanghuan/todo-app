import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { TokenVo } from 'src/token.vo';
import { RegisterUser } from '../args/register-user.args';
import { User } from '../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(args: RegisterUser): Promise<TokenVo> {
    const { username, password } = args;

    console.log('args: ', args);

    const entity = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!entity) {
      throw new BadRequestException('Usernmae/Password error.');
    }

    const isMatch = await compare(password, entity.password);
    if (!isMatch) {
      throw new BadRequestException('Usernmae/Password error.');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: entity.id,
      username,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: entity.id,
      },
      {
        expiresIn: '600s',
      },
    );

    const vo = new TokenVo();
    vo.access_token = accessToken;
    vo.refresh_token = refreshToken;
    return vo;
  }

  async github(user: any): Promise<TokenVo> {
    console.log(user);
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        username: user.username,
      },
      {
        expiresIn: '600s',
      },
    );

    console.log(accessToken, refreshToken);

    const vo = new TokenVo();
    vo.access_token = accessToken;
    vo.refresh_token = refreshToken;
    return vo;
  }

  async register(args: RegisterUser): Promise<string> {
    const { username, password } = args;

    let entity = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (entity) {
      throw new BadRequestException('Username exist.');
    }

    entity = new User();
    entity.username = username;

    const hashPwd = await hash(password, 12);
    entity.password = hashPwd;

    await this.userRepository.save(entity);
    return 'OK';
  }
}
