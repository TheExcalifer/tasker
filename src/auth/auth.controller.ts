import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password);
  }
}
