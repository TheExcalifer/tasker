import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Auth } from 'src/auth/auth.decorator';
import { UserRole } from 'src/users/enum/user.enum';
import { User } from 'src/users/user.schema';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @ApiOperation({
    summary: 'List Of Users',
  })
  @Auth(UserRole.ADMIN)
  @Get('users')
  getUsers(): Promise<User[]> {
    return this.adminService.getUsers();
  }

  @ApiOperation({
    summary: 'Change User Role To Admin',
  })
  @Auth(UserRole.ADMIN)
  @Patch('users/:id')
  convertUserToAdmin(@Param('id') id: string): Promise<void> {
    return this.adminService.convertUserToAdmin(id);
  }

  @ApiOperation({
    summary: 'Delete a User',
  })
  @Auth(UserRole.ADMIN)
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.adminService.deleteUser(id);
  }
}
