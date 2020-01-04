import { Controller, Get, Query, Render, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './users/users.model';

@Controller()
export class AppController {
  // Landing page
  @Render('index')
  @Get()
  public index(@Query('name') name?: string) {
    return { name };
  }

  // Authentication will use REST as it is more common and usable by third parties clients than GraphQL
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: { user: User }) {
    return req.user;
  }
}