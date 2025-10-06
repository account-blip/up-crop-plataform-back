import { PartialType } from '@nestjs/mapped-types';
import { CreateCampoDto } from './create-campo.dto';

export class UpdateCampoDto extends PartialType(CreateCampoDto) {}
