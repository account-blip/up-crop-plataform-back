import { PartialType } from '@nestjs/mapped-types';
import { CreateEjecucionDeConteoDto } from './create-ejecucion-de-conteo.dto';

export class UpdateEjecucionDeConteoDto extends PartialType(CreateEjecucionDeConteoDto) {}
