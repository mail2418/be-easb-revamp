import { IsNumber, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

export class DeleteUsulanJalanStatusDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;
}

