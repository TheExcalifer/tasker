import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { Task } from 'src/tasks/task.schema';
import { UserRole } from 'src/users/enum/user.enum';
import { User } from 'src/users/user.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectConnection() private connection: Connection,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async convertUserToAdmin(id: string): Promise<void> {
    const user = await this.userModel
      .updateOne({}, { role: UserRole.ADMIN })
      .where('_id')
      .equals(id);
    if (user.modifiedCount === 0) throw new NotFoundException();
  }

  async deleteUser(id: string): Promise<void> {
    const session = await this.connection.startSession();
    try {
      session.startTransaction();
      const user = await this.userModel
        .deleteOne()
        .where('_id')
        .equals(new Types.ObjectId(id))
        .where('role')
        .equals(UserRole.REGULAR)
        .session(session);
      if (user.deletedCount === 0) throw new NotFoundException();
      await this.taskModel
        .deleteMany()
        .where('owner')
        .equals(new Types.ObjectId(id))
        .session(session);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
