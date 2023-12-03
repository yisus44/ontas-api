import { Test, TestingModule } from '@nestjs/testing';
import { SmartphoneController } from '../smartphone.controller';
import { SmartphoneService } from '../smartphone.service';

describe('SmartphoneController', () => {
  let controller: SmartphoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartphoneController],
      providers: [SmartphoneService],
    }).compile();

    controller = module.get<SmartphoneController>(SmartphoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
