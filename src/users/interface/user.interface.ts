import { UserRole } from '../enum/user.enum';

export interface IUser {
  sub: string;
  email: string;
  role: UserRole;
}
