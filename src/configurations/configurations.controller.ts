import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';

@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}
  @Post(':id')
  create(@Param('id') id:string) {
    return this.configurationsService.create(id);
  }

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
