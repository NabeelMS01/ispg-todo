import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { TodoSchema } from './todo.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { UserSchema } from './user/user.model';
import { UserService } from './user/user.service';
import {JwtModule} from '@nestjs/jwt'
import { LocalStrategy } from './auth/local.strategy';
 
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/todo'),
    MongooseModule.forFeature([
      { name: 'todo', schema: TodoSchema },
      { name: 'users', schema: UserSchema },
    ]),JwtModule.register({
      secret:process.env.JWT_SECRET||"secret",
      signOptions:{expiresIn:"1d"}
    }),  
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
