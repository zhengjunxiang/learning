import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleAllDto } from './create-module-all.dto';

export class UpdateModuleAllDto extends PartialType(CreateModuleAllDto) {}
