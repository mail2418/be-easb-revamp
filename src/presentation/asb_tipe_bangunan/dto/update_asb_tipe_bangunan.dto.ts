import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateAsbTipeBangunanDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id!: number;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    tipe_bangunan!: string;
}
