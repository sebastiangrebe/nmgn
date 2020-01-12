import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // @todo Rewrite to get user from database
  // @todo Extend query parameters
  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({username: username});
  }
}