import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.gaurd';
import { LocalAuthGuard } from './auth/local-auth.gaurd';
import { TodostatusDto } from './todo.check.dto';
import { Todo } from './todo.model';

@UseGuards(JwtAuthGuard)
@Controller('/todo')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}
  // @UseGuards(JwtAuthGuard)
  @Post()
  async AddTask(@Body() todoDto: Todo, @Req() request: Request) {
    
const {id}:any=request.user
    console.log(request.user);
    

     todoDto.userId = await id;
    return this.appService.addTodo(todoDto);
  }
  //  @UseGuards(JwtAuthGuard)
  @Get()
  async alltodos(@Req() request: Request) {
    
    
    
 const {id, name}:any=request.user

   
 

    return await this.appService.alltodos(id);
  }

  @Patch(':id')
  async checktask(@Param('id') _id: string, updateData: TodostatusDto) {
    return this.appService.checktask(_id, updateData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') _id: string) {
    return await this.appService.deleteTask(_id);
  }
}
