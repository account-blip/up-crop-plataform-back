import { IsString } from "class-validator";

export class CreateCampoDto {

    @IsString()
    nombre: string
}
