import { PartialType } from '@nestjs/mapped-types';
import { CreateEstimacionDeCosechaDto } from './create-estimacion-de-cosecha.dto';

export class UpdateEstimacionDeCosechaDto extends PartialType(CreateEstimacionDeCosechaDto) {}
