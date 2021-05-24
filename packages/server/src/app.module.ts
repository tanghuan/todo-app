import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { User } from './entity/user.entity';

import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { AppResolver } from './resolvers/app.resolver';
import { AuthResolver } from './resolvers/auth.resolver';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      authSource: 'admin',
      username: 'root',
      password: 'example',
      database: 'test02',
      useUnifiedTopology: true,
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: true,
      sortSchema: true,

      // 不设置 在 Resolver 中只能注入 req，如果设置了可以注入 req 和 res。
      // 如果发现 graphql playground 里 cookie 写入不成功，在设置里将 "request.credentials": "omit", 改为 "request.credentials": "same-origin",
      context: ({ req, res }) => ({ req, res }),
    }),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AppService,
    AuthService,
    AppResolver,
    AuthResolver,
    JwtStrategy,
    GithubStrategy,
  ],
})
export class AppModule {}
