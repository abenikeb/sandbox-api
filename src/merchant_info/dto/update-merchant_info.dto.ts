import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchantInfoDto } from './create-merchant_info.dto';

export class UpdateMerchantInfoDto extends PartialType(CreateMerchantInfoDto) {}
