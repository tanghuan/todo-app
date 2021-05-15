import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './services/app.service';
import { AppResolver } from './resolvers/app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: true,
      sortSchema: true,
    }),
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
