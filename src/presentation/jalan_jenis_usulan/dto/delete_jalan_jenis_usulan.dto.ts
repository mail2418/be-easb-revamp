import { IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class DeleteJalanJenisUsulanDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;
}
