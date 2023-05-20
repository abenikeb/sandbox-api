import { Controller, Get } from '@nestjs/common';

@Controller('role')
export class RoleController {
  @Get()
  getName() {
    return 'role';
  }
}
