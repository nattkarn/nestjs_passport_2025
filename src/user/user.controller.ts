import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @Post('/find')
  @HttpCode(200)
  async findByEmail(@Body() body: { email: string }) {
    return this.userService.findByEmail(body);
  }

  @Get('/me')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async me(@Request() req: any) {
    console.log('req.user', req.user)
    const me = this.userService.findByEmail({email: req.user.email})
    return me;
  }
}
