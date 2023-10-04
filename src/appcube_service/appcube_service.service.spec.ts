import { Test, TestingModule } from '@nestjs/testing';
import { AppcubeServiceService } from './appcube_service.service';

describe('AppcubeServiceService', () => {
  let service: AppcubeServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppcubeServiceService],
    }).compile();

    service = module.get<AppcubeServiceService>(AppcubeServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
