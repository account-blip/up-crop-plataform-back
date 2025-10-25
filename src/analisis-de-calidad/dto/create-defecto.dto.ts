import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
import { TIPO_DEFECTO, TipoDefecto } from '../entities/defecto.entity';
  
  export class CreateDefectoDto {

    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsEnum(TIPO_DEFECTO)
    tipo: TipoDefecto;
  
  }