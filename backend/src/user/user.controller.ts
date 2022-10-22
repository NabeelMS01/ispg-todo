import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, response, Response } from 'express';

import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.gaurd';

@Controller('api')
export class UserController {
  constructor(
    private readonly userServices: UserService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    await this.userServices
      .register({
        name,
        email,
        password: hashedPassword,
      })
      .then((user) => {
        console.log(user);

        delete user.password;

        return user;
      })
      .catch((err) => {
        if (err.message.slice(0, 6) == 'E11000')
          console.log(err.message.slice(0, 6));
        throw new NotAcceptableException('Account already exist');
      });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req): any {
    const { name, _id } = req.user;
   

  return  this.authService.loginAuth({ name, _id });
     
  }

  // async login(
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  //   @Res({ passthrough: true })
  //   @Res() response: Response,
  // ) {
  //   const user = await this.userServices.login(email);

  //   if (!user) {
  //     throw new BadRequestException('invalid credentials');
  //   }

  //   if (!(await bcrypt.compare(password, user.password))) {
  //     throw new BadRequestException('invalid credential');
  //   }
  //   const jwt = await this.jwtService.signAsync({ id: user._id });
  //   console.log(user);

  //   response.cookie('jwt', jwt, { httpOnly: true });
  //   const success = { message: 'success' }
  //     return success;
  // }

  //  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Req() request: Request) {
    console.log(request.user);

    // try {
    //   const cookies = request.cookies['jwt'];

    //   const data = await this.jwtService.verifyAsync(cookies);

    //   if (!data) {
    //     throw new UnauthorizedException();
    //   }
    //   const user = await this.userServices.getUser(data.id);

    //   const { _id, name, email } = user;

    //   return { _id, name, email };
    // } catch (e) {
    //   throw new UnauthorizedException();
    // }

    return request.user;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return { message: 'success' };
  }
}
