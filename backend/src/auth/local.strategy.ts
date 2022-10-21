import {PassportStrategy} from "@nestjs/passport";
 
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Strategy } from "passport-local";
 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    console.log(email);
    
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }
    return user;
  }
}
