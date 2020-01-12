
import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { AppController } from './application.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: configService.get<string>('DATABASE_NAME') // @todo check if dbName is required or handled within DB URI
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      // Save the complete GraphQL schema into a schema.gql in the root folder
      // The schema is build on top of the TypeScript models/classes
      autoSchemaFile: 'schema.gql',
      // Pass the request and response object of Express directly to the resolvers
      context: ({ req, res }) => ({ req, res })
    }),
    RenderModule, AuthModule, UsersModule
  ],
  controllers: [AppController],
})
export class AppModule {}