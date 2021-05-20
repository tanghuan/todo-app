import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entity/user.entity';

import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { AppResolver } from './resolvers/app.resolver';
import { AuthResolver } from './resolvers/auth.resolver';

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
    }),
  ],
  controllers: [],
  providers: [AppService, AuthService, AppResolver, AuthResolver],
})
export class AppModule {}
