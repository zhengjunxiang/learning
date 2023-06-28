import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module1Module } from './module1/module1.module';
import { ModuleAllModule } from './module-all/module-all.module';

@Module({
  imports: [Module1Module, ModuleAllModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
