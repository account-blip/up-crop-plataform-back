import { IsNotEmpty, IsString } from "class-validator"

export class CreateCuarteleDto {

    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsNotEmpty()
    campoEspecificoId: string 
}
