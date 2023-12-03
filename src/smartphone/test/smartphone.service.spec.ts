import { Test, TestingModule } from '@nestjs/testing';
import { SmartphoneService } from '../smartphone.service';

describe('SmartphoneService', () => {
  let service: SmartphoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartphoneService],
    }).compile();

    service = module.get<SmartphoneService>(SmartphoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
