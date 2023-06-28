import { Test, TestingModule } from '@nestjs/testing';
import { ModuleAllController } from './module-all.controller';
import { ModuleAllService } from './module-all.service';

describe('ModuleAllController', () => {
  let controller: ModuleAllController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModuleAllController],
      providers: [ModuleAllService],
    }).compile();

    controller = module.get<ModuleAllController>(ModuleAllController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
