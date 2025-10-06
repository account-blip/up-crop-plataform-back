import { IsNotEmpty, IsString } from "class-validator";

export class CreatePortainjertoDto {

    @IsString()
    @IsNotEmpty()
    nombre: string
}
