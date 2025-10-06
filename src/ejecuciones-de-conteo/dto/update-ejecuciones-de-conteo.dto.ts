import { PartialType } from '@nestjs/mapped-types';
import { CreateEjecucionesDeConteoDto } from './create-ejecuciones-de-conteo.dto';

export class UpdateEjecucionesDeConteoDto extends PartialType(CreateEjecucionesDeConteoDto) {}
