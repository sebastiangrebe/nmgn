import { Field, ID, ObjectType } from 'type-graphql';
import { buildSchema, prop, modelOptions, getModelForClass } from '@typegoose/typegoose';

/**
 * TypeScript User class
 * Uses decorators from type-graphql package to allow automatic generation of GraphQL schema
 */
@modelOptions({ schemaOptions: {} })
@ObjectType()
export class User {
  @prop()
  @Field(type => ID)
  _id!: string|number;

  @prop()
  @Field()
  username!: string;

  @prop()
  @Field()
  password?: string;
}

export const UserModel = getModelForClass(User);
export const UserSchema = buildSchema(User);
