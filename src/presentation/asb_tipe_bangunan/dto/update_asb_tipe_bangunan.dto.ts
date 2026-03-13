import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateAsbTipeBangunanDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsString()
    @IsNotEmpty()
    tipe_bangunan!: string;
}
