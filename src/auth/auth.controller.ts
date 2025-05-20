import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    // console.log(req)
    const login = this.authService.login(req.user);
    return login;
  }
}
