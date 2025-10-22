import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadesProductivaDto } from './create-unidades-productiva.dto';

export class UpdateUnidadesProductivaDto extends PartialType(CreateUnidadesProductivaDto) {}
