import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const isUserExist = await this.userService.findByEmailHavePassword({
      email,
    });

    // console.log(isUserExist);

    if (
      isUserExist &&
      (await bcrypt.compare(password, isUserExist.data.password))
    ) {
      return {
        id: isUserExist.data.id,
        username: isUserExist.data.username,
        // name: isUserExist.data.name,
        // tel: isUserExist.data.tel,
        email: isUserExist.data.email,
      };
    }
    throw new NotFoundException('User not found or password not match');
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    // console.log("payload", payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
