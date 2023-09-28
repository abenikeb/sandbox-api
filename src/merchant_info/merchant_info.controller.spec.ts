import { Test, TestingModule } from '@nestjs/testing';
import { MerchantInfoController } from './merchant_info.controller';
import { MerchantInfoService } from './merchant_info.service';

describe('MerchantInfoController', () => {
  let controller: MerchantInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchantInfoController],
      providers: [MerchantInfoService],
    }).compile();

    controller = module.get<MerchantInfoController>(MerchantInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
