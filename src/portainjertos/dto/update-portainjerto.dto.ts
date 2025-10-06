import { PartialType } from '@nestjs/mapped-types';
import { CreatePortainjertoDto } from './create-portainjerto.dto';

export class UpdatePortainjertoDto extends PartialType(CreatePortainjertoDto) {}
