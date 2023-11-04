import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './enum/user.enum';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({ ...createUserDto, role: UserRole.REGULAR });
  }
  findUser(email: string) {
    return this.userModel.findOne({ email });
  }
}
