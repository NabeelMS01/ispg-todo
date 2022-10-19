import { Injectable } from '@nestjs/common';
import { Todo, TodoDocument } from './todo.model';
import mongoose, { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
 

const ObjectId: any = mongoose.Types.ObjectId;
@Injectable()
export class AppService {
  constructor(
    @InjectModel('todo') private readonly todoModel: Model<TodoDocument>,
  ) {}

  //createing a task
  async addTodo(todo: Todo ): Promise<Todo> {
    try {
       
        
      const newTodo = new this.todoModel(todo);
      await newTodo
        .save()
        .then((response) => {
          if (response) return response;
        })
        .catch((err: any) => {
          console.log(err.message);
          if(err.message){
            throw new Error("exist")
          }
        });
    } catch (error) {
      console.log(error);
      return error; // console.log(error.message);
    }
  }

  // reading all tasks
  async alltodos(id:string) {
   


    return await this.todoModel.find({userId:id}).lean();
  }

  // check task
  async checktask(_id: string, data: any) {
    try {
      const task = await this.todoModel.findOne({ _id });

      let check = await this.todoModel.findOneAndUpdate(
        { _id },
        {
          status: !task.status,
        },
        { upsert: true },
      );
      console.log(check);
      console.log('check');
      return check;

      // else {
      //   let checked = await this.todoModel.findOneAndUpdate(
      //     { _id },
      //     {
      //       status: true,
      //     },
      //     { upsert: true },
      //   );

      //   return checked;
      // }
    } catch (error) {
      console.log(error);
    }
  }

  // delete task

  async deleteTask(_id: string) {
    try {
      console.log(_id);

      const data = await this.todoModel.findOneAndDelete({
        _id: ObjectId(_id),
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
