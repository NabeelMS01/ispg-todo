import { Module, Global } from '@nestjs/common';

import { AppService } from './app.service';
import { TodoSchema } from './todo.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { UserSchema } from './user/user.model';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth/local.strategy';

import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/todo'),
    MongooseModule.forFeature([
      { name: 'todo', schema: TodoSchema },
      { name: 'users', schema: UserSchema },
    ]),
    JwtModule.register({
      secret: 'secret' || process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    
    UserModule,AuthModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService,  LocalStrategy,    JwtStrategy],
})
export class AppModule {}
