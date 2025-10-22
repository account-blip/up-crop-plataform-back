import { IsNotEmpty, IsString } from "class-validator";


export class CreateUnidadesProductivaDto {

    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsNotEmpty()
    empresaId: string
}
