import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MerchantInfoService } from './merchant_info.service';
import { CreateMerchantInfoDto } from './dto/create-merchant_info.dto';
import { UpdateMerchantInfoDto } from './dto/update-merchant_info.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { MmServicesService } from 'src/mm_services/mm_services.service';
// import { MmServicesService } from 'src/mm_services/mm_services.service';

@Controller('merchant-info')
export class MerchantInfoController {
  shortcode:string = "1234"
  constructor(private readonly merchantInfoService: MerchantInfoService,
    private readonly mmService:MmServicesService
    ) {}
  @Public()
  @Post()
  create(@Body() createMerchantInfoDto: CreateMerchantInfoDto) {
    return this.merchantInfoService.create(createMerchantInfoDto);
  }
  
  @Public()
  @Post('createTopOrg')
  createOrg(@Body() data:any) {
    return this.mmService.createTopOrg(data.shortCode,data.organizationName)
    // return this.merchantInfoService();
  }
  @Public()
  @Post('setOrgPublicKey')
  setOrgPublicKey(@Body() data:any) {
    return this.mmService.setOrgPublicKey(data.shortCode)
    // return this.merchantInfoService();
  }
  @Public()
  @Post('getOrgCredInfo')
  getOrgCredInfo(@Body() data:any) {
    return this.mmService.getOrgCredInfo(data.shortCode)
  }
  @Public()
  @Get()
  findAll() {
    return this.merchantInfoService.findAll();
  }
  @Public()

  @Get('user')
  findOne(@Body() data:any) {
    return this.merchantInfoService.findOneWithSortCode(data.user_id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMerchantInfoDto: UpdateMerchantInfoDto) {
  //   return this.merchantInfoService.update(+id, updateMerchantInfoDto);
  // }
  @Public()

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantInfoService.remove(+id);
  }
}
