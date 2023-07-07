import {
  Body,
  Controller,
  Delete,
  Patch,
  Get,
  Res,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { User } from './schemas/user.schema';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.userService.create(createUserDto, res);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async put(
    @Param('id') id: string,
    @Body() UpdateUserDto: any,
    @Res() res: Response,
  ) {
    await this.userService.update(id, UpdateUserDto, res);
  }

  @Patch('updatePassword/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: any,
  ): Promise<{ success: boolean }> {
    const { userId, currentPassword, newPassword } = updatePasswordDto;
    console.log({
      currentPassword,
      newPassword,
    });

    // Verify that the user's current password matches the password stored in the mongo db
    const isValidPassword = await this.userService.validateUserPassword(
      id,
      currentPassword,
    );

    if (!isValidPassword) {
      return { success: false };
    }

    // Update the user's password in the database with the new password
    await this.userService.updateUserPassword(id, newPassword);

    return { success: true };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
