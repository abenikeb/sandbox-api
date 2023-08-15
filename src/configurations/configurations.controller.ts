import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { MongoExceptionFilter } from './util/errorHanddler';
import { UpdateNotifyDto } from './dto/update-notify.dto';

// import { Public } from 'src/auth/decorators/public.decorator'; for testing

@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}
  // @Public()
  @Post(':id')
  @UseFilters(MongoExceptionFilter)
  create(@Param('id') id: any) {
    console.log(id);
    try {
      return this.configurationsService.create(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  // @Get()
  // async findAll() {
  //   try {
  //     await this.service.findAll();
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.FORBIDDEN,
  //         error: 'This is a custom message',
  //       },
  //       HttpStatus.FORBIDDEN,
  //       {
  //         cause: error,
  //       },
  //     );
  //   }
  // }

  @Get()
  findAll() {
    return this.configurationsService.findAll();
  }
  // @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configurationsService.findByUserId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.configurationsService.update(id);
  }
  @Patch(':id')
  updateNotify(@Param('id') id: string, @Body() body: UpdateNotifyDto) {
    if (!body || !id) {
      throw new HttpException(
        {
          error_code: '600089774',
          error_msg: 'Required parameter is missing.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.configurationsService.updateNotifyUrl(id, body.notify_url);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configurationsService.remove(id);
  }
}
