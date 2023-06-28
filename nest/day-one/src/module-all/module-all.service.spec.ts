import { Test, TestingModule } from '@nestjs/testing';
import { ModuleAllService } from './module-all.service';

describe('ModuleAllService', () => {
  let service: ModuleAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleAllService],
    }).compile();

    service = module.get<ModuleAllService>(ModuleAllService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
