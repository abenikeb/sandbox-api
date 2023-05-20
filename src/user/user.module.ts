import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleController } from './role.controller';

@Module({
  imports: [],
  exports: [],
  controllers: [UserController, RoleController],
  providers: [UserService],
})
export class UserModule {}
