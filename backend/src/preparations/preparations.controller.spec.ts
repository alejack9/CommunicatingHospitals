import { Test, TestingModule } from '@nestjs/testing';
import { PreparationsController } from './preparations.controller';

describe('Preparations Controller', () => {
  let controller: PreparationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreparationsController],
    }).compile();

    controller = module.get<PreparationsController>(PreparationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
