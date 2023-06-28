import { Module } from '@nestjs/common';
import { ModuleAllService } from './module-all.service';
import { ModuleAllController } from './module-all.controller';

@Module({
  controllers: [ModuleAllController],
  providers: [ModuleAllService]
})
export class ModuleAllModule {}
