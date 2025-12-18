import { IsString, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

export class CreateAsbTipeBangunanDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    tipe_bangunan!: string;
}
