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
      context: ({ req }) => ({
        req,
      }),
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
  providers: [AppService, AuthService, AppResolver, AuthResolver, JwtStrategy],
})
export class AppModule {}
