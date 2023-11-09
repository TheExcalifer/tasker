import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Auth } from 'src/auth/auth.decorator';
import { UserRole } from 'src/users/enum/user.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/users/decorator/user.decorator';
import { IUser } from 'src/users/interface/user.interface';
import { Task } from './task.schema';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @ApiOperation({
    summary: 'Create Task',
    description: 'Create a task by authenticated user',
  })
  @Auth(UserRole.REGULAR)
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @User() user: IUser,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @ApiOperation({
    summary: 'Get User Tasks',
  })
  @Auth(UserRole.REGULAR)
  @Get()
  getTasks(@User() user: IUser): Promise<Task[]> {
    return this.taskService.getTasks(user);
  }

  @ApiOperation({
    summary: 'Delete Task',
  })
  @Auth(UserRole.REGULAR)
  @Delete(':id')
  deleteTask(@User() user: IUser, @Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(user, id);
  }

  @ApiOperation({
    summary: 'Update Task',
  })
  @Auth(UserRole.REGULAR)
  @Patch(':id')
  updateTask(
    @User() user: IUser,
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<void> {
    return this.taskService.updateTask(user, updateTaskDto, id);
  }
}
