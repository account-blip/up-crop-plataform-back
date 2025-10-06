import { IsNotEmpty, IsString } from "class-validator";

export class CreateCampoEspecificoDto {

    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsNotEmpty()
    campoId: string
}
