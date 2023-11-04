import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from './enum/user.enum';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true, minlength: 3, maxlength: 64 })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 256,
  })
  email: string;

  @Prop({ type: String, required: true, minlength: 8, maxlength: 256 })
  password: string;

  @Prop({ type: String, required: true })
  role: UserRole;
}
export const UserSchema = SchemaFactory.createForClass(User);
