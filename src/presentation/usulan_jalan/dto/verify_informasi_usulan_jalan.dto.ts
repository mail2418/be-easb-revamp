import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class VerifyInformasiUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    idUsulanJalan: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    verifLebarJalan?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    verifIdJalanJenisPerkerasan?: number;
}


