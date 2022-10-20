 import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/local.strategy';
import { UserService } from './user.service';

@Module({
    imports:[AuthModule],
  providers: [UserService,AuthService,LocalStrategy],
  exports: [UserService,AuthService],
})
export class UsersModule {}