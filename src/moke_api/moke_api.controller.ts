import { Controller, Get, Post, Body, Patch, Param, Delete,Headers } from '@nestjs/common';
import { MokeApiService } from './moke_api.service';
import { CreateMokeApiDto } from './dto/create-moke_api.dto';
import { UpdateMokeApiDto } from './dto/update-moke_api.dto';
import { ApplyFabricTokenDto, ApplyFabricTokenHeaderDto } from './dto/applyFabricToken.dto';

@Controller('moke-api')
export class MokeApiController {
  constructor(private readonly mokeApiService: MokeApiService) {}

  @Post('applyFabricToken')
  applyFabricToken(@Body() body: ApplyFabricTokenDto, @Headers('X-APP-Key') headers: ApplyFabricTokenHeaderDto) {
    console.log(body.appSecret); // Output the request body to the console
    console.log(headers); // Output the request headers to the console
    if (!headers) {
      return {
        "error_code":"string",
        "error_msg":"string"
      }
    }
    return this.mokeApiService.applyFabricToken("fabric_app_id","app_secret")
  }  

  @Post()
  create(@Body() createMokeApiDto: CreateMokeApiDto) {
    return this.mokeApiService.create(createMokeApiDto);
  }

  @Get()
  findAll() {
    return this.mokeApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mokeApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMokeApiDto: UpdateMokeApiDto) {
    return this.mokeApiService.update(+id, updateMokeApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mokeApiService.remove(+id);
  }
}
