import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(256)
  password: string;
}
