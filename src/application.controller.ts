import { Controller, Get, Query, Render, Post, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { User } from './users/users.model';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}
  // Landing page
  @Render('index')
  @Get()
  public index(@Query('name') name?: string) {
    return { name };
  }

  // Landing page
  @Render('login')
  @Get('login')
  public loginPage() {}

  // Authentication will use REST as it is more common and usable by third parties clients than GraphQL
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req: { user: User }, @Res() res: Response) {
    const login = this.authService.login(req.user);
    const ttl = (this.configService.get<number>('JWT_TTL') || 3600) * 1000;
    const cookieOptions =  {
      maxAge: ttl,
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production'
    };
    res.cookie('jwt', (await login).access_token, cookieOptions);
    return res.json((await login));
  }
}