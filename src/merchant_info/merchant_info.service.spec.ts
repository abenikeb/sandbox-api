import { Test, TestingModule } from '@nestjs/testing';
import { MerchantInfoService } from './merchant_info.service';

describe('MerchantInfoService', () => {
  let service: MerchantInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerchantInfoService],
    }).compile();

    service = module.get<MerchantInfoService>(MerchantInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
