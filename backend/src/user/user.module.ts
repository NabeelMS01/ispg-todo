import { Module,Global } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/auth/auth.module';

import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/local.strategy';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import { UserService } from './user.service';
 
@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: UserSchema }])],
  providers: [UserService, AuthService, LocalStrategy, JwtService],
  controllers: [UserController],
  exports: [UserService, AuthService],
})
export class UserModule {}
