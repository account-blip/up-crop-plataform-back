import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TIPO_CONTROL, TipoControl } from '../entities/control-calidad.entity';

/* ===============================
   🧭 Sub DTOs
================================ */

class DefectoCantidadDto {
  @IsString()
  id: string;

  @IsNumber()
  porcentaje: number;
}

export class CreateControlCalidadDto {
  @IsEnum(TIPO_CONTROL)
  tipo: TipoControl;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DefectoCantidadDto)
  defectos: DefectoCantidadDto[];
}

export class CreateTemperaturaHoraDto {
  @IsString()
  @IsNotEmpty()
  hora: string;

  @IsDateString()
  fecha: string;

  @IsNumber()
  temperatura_pulpa: number;
}

export class CreateTemperaturaDiaDto {
  @IsDateString()
  fecha: string;

  @IsNumber()
  temperatura: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTemperaturaHoraDto)
  temperaturasHora: CreateTemperaturaHoraDto[];
}

export class CreateColorDto {
  @IsDateString()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  @IsOptional()
  porcentaje?: number;
}

export class CreateCalibreDto {
  @IsDateString()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  calibre: string;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  @IsOptional()
  porcentaje?: number;
}

/* ===============================
   🧪 DTO Principal
================================ */

export class CreateAnalisisDeCalidadDto {
  @IsDateString()
  fecha: Date;

  @IsNumber()
  @IsOptional()
  temperaturaBins?: number;

  @IsNumber()
  @IsOptional()
  brix?: number;

  @IsString()
  variedadId: string;

  @IsString()
  cuartelId: string;

  // Sub DTOs
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCalibreDto)
  calibres: CreateCalibreDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateColorDto)
  colores: CreateColorDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateControlCalidadDto)
  controlesCalidad: CreateControlCalidadDto[];

}
