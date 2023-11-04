import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;

    // * Hash Password
    const saltOrRounds = 10;
    createUserDto.password = await bcrypt.hash(password, saltOrRounds);

    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      if (error.code === 11000)
        // * The error code 11000 in MongoDB is a duplicate key error.
        throw new BadRequestException('Email address is already in use.');
    }
  }

  async login(email: string, password: string): Promise<object> {
    // * Hash Password
    const user: any = await this.userService.findUser(email.toLowerCase());
    if (!user) throw new NotFoundException();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new NotFoundException();

    // * global config
    // * JWT
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
