import { PartialType } from '@nestjs/mapped-types';
import { CreateVariedadeDto } from './create-variedade.dto';

export class UpdateVariedadeDto extends PartialType(CreateVariedadeDto) {}
