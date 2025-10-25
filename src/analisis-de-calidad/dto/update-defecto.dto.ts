import { PartialType } from '@nestjs/mapped-types';
import { CreateDefectoDto } from './create-defecto.dto'

export class UpdateDefectoDto extends PartialType(CreateDefectoDto) {}
