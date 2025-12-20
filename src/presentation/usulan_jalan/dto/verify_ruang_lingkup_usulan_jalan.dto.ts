import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class VerifyRuangLingkupUsulanJalanDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idUsulanJalan: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    verifIdSpesifikasiDesain?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    verifIdRuangLingkup?: number;

    @IsOptional()
    @IsString()
    verifKeteranganTambahan?: string;
}
