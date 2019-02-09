import { Test, TestingModule } from '@nestjs/testing';
import { PreparationsService } from './preparations.service';

describe('PreparationsService', () => {
  let service: PreparationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreparationsService],
    }).compile();

    service = module.get<PreparationsService>(PreparationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
