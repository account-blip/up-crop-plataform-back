import { IsNotEmpty, IsString } from "class-validator";

export class CreateVariedadeDto {

    @IsString()
    @IsNotEmpty()
    nombre: string
}
