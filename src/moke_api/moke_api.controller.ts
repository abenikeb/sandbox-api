import { Controller, Get, Post, Body, Patch, Param, Delete,Headers, Res } from '@nestjs/common';
import { MokeApiService } from './moke_api.service';
import { CreateMokeApiDto } from './dto/create-moke_api.dto';
import { UpdateMokeApiDto } from './dto/update-moke_api.dto';
import { ApplyFabricTokenDto, ApplyFabricTokenHeaderDto } from './dto/applyFabricToken.dto';
import { Response } from 'express';

@Controller('moke-api')
export class MokeApiController {
  constructor(private readonly mokeApiService: MokeApiService) {}

  @Post('applyFabricToken')
  applyFabricToken(@Body() body: ApplyFabricTokenDto, @Headers('X-APP-Key') headers: any
  ) {
    console.log(body.appSecret); // Output the request body to the console
    console.log(headers); // Output the request headers to the console
    if (!headers || !body.appSecret) {
      return {
        error_code: 'string',
        error_msg: 'string',
      };
    }
    return this.mokeApiService.applyFabricToken(body.appSecret,headers)
  }
  @Post('preOrder')  
  createOrder(@Body() body:any , @Headers('X-APP-Key') fabric_app_id: any,@Headers('Authorization') token: any)
{
  const biz = body.biz_content
  if (!fabric_app_id || !body || !biz || !body.timestamp || !body.method || body.method!="payment.preorder" || !body.nonce_str) {
    return {
        "error_code":"string",
        "error_msg":"string"
      }
  } 
  if(!body.sign_type || body.sign_type!="SHA256WithRSA"){
    return {
        "error_code":"string",
        "error_msg":"sign type must be SHA256WithRSA"
      }
  }
  if(!biz.trans_currency || biz.trans_currency!="ETB"){
    return {
        "error_code":"string",
        "error_msg":"transCurrency type must be ETB"
      }
  }
  return this.mokeApiService.createOrder(fabric_app_id, biz.appid, biz.merch_code,biz.merch_order_id)
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
