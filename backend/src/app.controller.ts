import { Controller,Get ,Post,Body, Patch, Param,Delete, Req} from "@nestjs/common/decorators";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { AppService } from "./app.service";
import { TodostatusDto } from "./todo.check.dto";
import { Todo } from "./todo.model";


@Controller('/todo')
export class AppController{
  constructor(private readonly appService:AppService, private jwtService: JwtService){}

   
  @Post()
  async AddTask(@Body() todoDto:Todo,@Req() request: Request ){
    const cookies = request.cookies['jwt'];

    const data:any = await this.jwtService.verifyAsync(cookies);
 
    todoDto.userId =await data.id
       return this.appService.addTodo(todoDto)
  }
 
  @Get()
 async alltodos(@Req() request: Request){
  const cookies = request.cookies['jwt'];

  const data:any = await this.jwtService.verifyAsync(cookies);
  console.log(data);
  
    return await this.appService.alltodos(data.id)
  }

@Patch(':id')
async checktask(  @Param("id") _id:string,  updateData:TodostatusDto){
 
  return this.appService.checktask(_id,updateData)

}

@Delete(':id')
async deleteTask(@Param("id") _id:string ){
  return await this.appService.deleteTask(_id)
}


}