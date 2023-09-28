import { Test, TestingModule } from '@nestjs/testing';
import { MmServicesService } from './mm_services.service';

describe('MmServicesService', () => {
  let service: MmServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MmServicesService],
    }).compile();

    service = module.get<MmServicesService>(MmServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
