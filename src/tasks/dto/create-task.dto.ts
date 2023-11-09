import { Transform, TransformFnParams } from 'class-transformer';
import { IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { TaskStatus } from '../enum/task.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(64)
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  title: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(256)
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
