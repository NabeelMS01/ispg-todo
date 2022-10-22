import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from '../auth/jwt.strategy';

import { UserModule } from 'src/user/user.module';
 

@Module({
  imports: [
    UserModule,
    PassportModule ,
    JwtModule.register({
      secret:  jwtConstants.secret,// should be in env file
      signOptions: {
        expiresIn: '1d',
      },
    }), 
     
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  controllers: [],
  exports: [ AuthService,],
})
export class AuthModule {}
