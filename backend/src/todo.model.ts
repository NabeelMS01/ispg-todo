import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  id: string;
  @Prop({ required: true })
  text: string;
  @Prop( )
  userId: string; 
  @Prop()
  status: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
