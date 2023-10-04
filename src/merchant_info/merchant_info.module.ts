import { Module } from '@nestjs/common';
import { MerchantInfoService } from './merchant_info.service';
import { MerchantInfoController } from './merchant_info.controller';
import { Merchant, MerchantSchema } from './schemas/merchant_info.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { MmServicesService } from 'src/mm_services/mm_services.service';
import { AppcubeServiceService } from 'src/appcube_service/appcube_service.service';

@Module({
  
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema }]),
  ],
  controllers: [MerchantInfoController],
  providers: [MerchantInfoService,MmServicesService,AppcubeServiceService]
})
export class MerchantInfoModule {}
