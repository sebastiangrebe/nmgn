import { Injectable } from '@nestjs/common';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private readonly users: User[];

  // @todo Get users from database
  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  // @todo Rewrite to get user from database
  // @todo Extend query parameters
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}