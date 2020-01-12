import { Injectable } from '@nestjs/common';
import { User, UserModel } from './users.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: typeof UserModel) {}

  // @todo Extend query parameters
  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({username: username}).lean();
  }
}