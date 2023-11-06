import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { UserRole } from 'src/users/enum/user.enum';
import { AuthGuard } from './auth.guard';

export const Auth = (role: UserRole) => {
  return applyDecorators(SetMetadata('role', role), UseGuards(AuthGuard));
};
