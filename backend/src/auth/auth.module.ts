import { Module } from '@nestjs/common';
 
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from '../auth/jwt.strategy';
 
import { UserModule } from 'src/user/user.module';
import { UserController } from 'src/user/user.controller';
 
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET||"secret",
      signOptions: {
    
        expiresIn: '1d',
      },
    }),
  ],
  providers: [ AuthService,LocalStrategy   ],
  controllers:[ ]
  
})
export class AuthModule {}
