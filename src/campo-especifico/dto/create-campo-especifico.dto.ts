import { IsString } from "class-validator";

export class CreateCampoEspecificoDto {

    @IsString()
    nombre: string

    @IsString()
    campoId: string
}
