import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TaskStatus } from './enum/task.enum';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true, min: 1, max: 64 })
  title: string;

  @Prop({ required: true, min: 1, max: 256 })
  description: string;

  @Prop({ required: true })
  status: TaskStatus;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
