import {
  BadRequestException,
  HttpCode,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './task.schema';
import { Model, Types, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { IUser } from 'src/users/interface/user.interface';
import { UpdateTaskDto } from './dto/update-task.dto';
@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  createTask(createTaskDto: CreateTaskDto, user: IUser): Promise<Task> {
    return this.taskModel.create({
      ...createTaskDto,
      owner: new Types.ObjectId(user.sub),
    });
  }
  async getTasks(user: IUser): Promise<Task[]> {
    const tasks = await this.taskModel
      .find()
      .where('owner')
      .equals(new Types.ObjectId(user.sub));
    if (tasks.length === 0) throw new NotFoundException();
    return tasks;
  }
  async deleteTask(user: IUser, id: string): Promise<void> {
    const task = await this.taskModel
      .deleteOne()
      .where('_id')
      .equals(id)
      .where('owner')
      .equals(new Types.ObjectId(user.sub));
    if (task.deletedCount === 0) throw new NotFoundException();
  }
  async updateTask(
    user: IUser,
    updateTaskDto: UpdateTaskDto,
    id: string,
  ): Promise<void> {
    const { title, status, description } = updateTaskDto;
    const task = await this.taskModel
      .updateOne({}, { title, status, description })
      .where('_id')
      .equals(id)
      .where('owner')
      .equals(new Types.ObjectId(user.sub));
    if (task.modifiedCount === 0) throw new NotFoundException();
  }
}
