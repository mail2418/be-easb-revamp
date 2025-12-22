import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyInformasiUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanJalan: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    verifLebarJalan?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    verifIdJalanJenisPerkerasan?: number;
}


