import { PartialType } from '@nestjs/mapped-types';
import { CreateCampoEspecificoDto } from './create-campo-especifico.dto';

export class UpdateCampoEspecificoDto extends PartialType(CreateCampoEspecificoDto) {}
