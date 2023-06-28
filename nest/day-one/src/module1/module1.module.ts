import { Module } from '@nestjs/common';
import { Module1Controller } from './module1.controller';

@Module({
  controllers: [Module1Controller],
})
export class Module1Module {}
