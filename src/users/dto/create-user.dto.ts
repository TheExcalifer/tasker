import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(256)
  @Transform((params: TransformFnParams) =>
    sanitizeHtml(params.value).toLowerCase().trim(),
  )
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(256)
  password: string;
}
