
import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { AppController } from './application.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // Save the complete GraphQL schema into a schema.gql in the root folder
      // The schema is build on top of the TypeScript models/classes
      autoSchemaFile: 'schema.gql',
      // Pass the request and response object of Express directly to the resolvers
      context: ({ req, res }) => ({ req, res })
    }),
    RenderModule, AuthModule, UsersModule
  ],
  controllers: [AppController]
})
export class AppModule {}