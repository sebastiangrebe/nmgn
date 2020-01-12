import { Field, ID, ObjectType } from 'type-graphql';
import { buildSchema } from '@typegoose/typegoose';
import { Document } from 'mongoose';

/**
 * TypeScript User class
 * Uses decorators from type-graphql package to allow automatic generation of GraphQL schema
 */
@ObjectType()
export class User extends Document {
  @Field(type => ID)
  userId!: string|number;

  @Field()
  username!: string;

  @Field()
  password?: string;
}

export const UserSchema = buildSchema(User);
