import { PartialType } from '@nestjs/mapped-types';
import { CreateAnalisisDeCalidadDto } from './create-analisis-de-calidad.dto';

export class UpdateAnalisisDeCalidadDto extends PartialType(CreateAnalisisDeCalidadDto) {}
