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

@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Post(':id')
  @UseFilters(MongoExceptionFilter)
  create(@Param('id') id: string) {
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configurationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.configurationsService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configurationsService.remove(id);
  }
}
