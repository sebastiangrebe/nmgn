import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from '../users/users.model';
import { GqlAuthGuard } from '../graphql/graphql.authguard';
import { CurrentUser } from '../users/currentUser.decorator';
@Resolver()
export class AuthResolver {
  constructor() {}

  // Retrieve currently logged in user
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async currentUser(@CurrentUser() user: User
  ) {
    return user;
  }

  // Retrieve currently logged in user
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async currentUsert(@CurrentUser() user: User
  ) {
    return {
      username: "asd",
      _id:"asasd"
    };
  }
}