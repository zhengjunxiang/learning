import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModuleAllService } from './module-all.service';
import { CreateModuleAllDto } from './dto/create-module-all.dto';
import { UpdateModuleAllDto } from './dto/update-module-all.dto';

@Controller('module-all')
export class ModuleAllController {
  constructor(private readonly moduleAllService: ModuleAllService) {}

  @Post()
  create(@Body() createModuleAllDto: CreateModuleAllDto) {
    return this.moduleAllService.create(createModuleAllDto);
  }

  @Get()
  findAll() {
    return this.moduleAllService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleAllService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModuleAllDto: UpdateModuleAllDto,
  ) {
    return this.moduleAllService.update(+id, updateModuleAllDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleAllService.remove(+id);
  }
}
