import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService, AppDetails } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthRequest } from './users/auth-request';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) { }

  @Get('details')
  details(): AppDetails {
    return this.appService.getDetails();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthRequest) {
    return req.user;
  }
}
