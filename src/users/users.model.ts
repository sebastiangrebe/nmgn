import { Field, ID, ObjectType } from 'type-graphql';

/**
 * TypeScript User class
 * Uses decorators from type-graphql package to allow automatic generation of GraphQL schema
 */
@ObjectType()
export class User {
  @Field(type => ID)
  userId!: string|number;

  @Field()
  username!: string;

  @Field()
  password?: string;

}