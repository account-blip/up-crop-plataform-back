import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator"
import { ESTADO_TYPE, EstadoType } from "../entities/estimacion-de-cosecha.entity"

export class CreateEstimacionDeCosechaDto {

    @IsInt()
    @IsNotEmpty()
    hilera: number

    @IsInt()
    @IsNotEmpty()
    arbol: number

    @IsInt()
    @IsNotEmpty()
    dardo: number

    @IsInt()
    @IsNotEmpty()
    ramilla: number 

    @IsEnum(ESTADO_TYPE)
    estado: EstadoType;

    @IsString()
    @IsNotEmpty()
    foto: string

    @IsString()
    @IsNotEmpty()
    userId: string  

    @IsString()
    @IsNotEmpty()
    campoEspecificoId: string

    @IsString()
    @IsNotEmpty()
    cuartelId: string

    @IsString()
    @IsNotEmpty()
    portainjertoId: string

    @IsString()
    @IsNotEmpty()
    variedadId: string
}
