import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipeSaluranDto {
    @IsNotEmpty()
    @IsString()
    tipe_saluran!: string;
}
