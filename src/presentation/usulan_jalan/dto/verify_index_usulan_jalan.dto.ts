import { IsInt, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyIndexUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanJalan!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbJenis?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idJalanJenisPerkerasan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idJalanJenisPemeliharaan?: number;
}

