import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.login(email);

    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async loginAuth(user: any) {
    const payload = { name: user.name, id: user._id };

    return {
      access_token: this.jwtService.signAsync(payload),
    };
  }
}
