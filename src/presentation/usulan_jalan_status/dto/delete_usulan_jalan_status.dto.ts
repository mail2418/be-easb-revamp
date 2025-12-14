import { IsNumber, IsNotEmpty } from "class-validator";

export class DeleteUsulanJalanStatusDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;
}

