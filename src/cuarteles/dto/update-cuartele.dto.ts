import { PartialType } from '@nestjs/mapped-types';
import { CreateCuarteleDto } from './create-cuartele.dto';

export class UpdateCuarteleDto extends PartialType(CreateCuarteleDto) {}
