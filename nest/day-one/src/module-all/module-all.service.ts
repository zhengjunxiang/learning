import { Injectable } from '@nestjs/common';
import { CreateModuleAllDto } from './dto/create-module-all.dto';
import { UpdateModuleAllDto } from './dto/update-module-all.dto';

@Injectable()
export class ModuleAllService {
  create(createModuleAllDto: CreateModuleAllDto) {
    return 'This action adds a new moduleAll';
  }

  findAll() {
    return `This action returns all moduleAll`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moduleAll`;
  }

  update(id: number, updateModuleAllDto: UpdateModuleAllDto) {
    return `This action updates a #${id} moduleAll`;
  }

  remove(id: number) {
    return `This action removes a #${id} moduleAll`;
  }
}
