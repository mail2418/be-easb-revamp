import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { JenisUsulanJalan } from 'src/domain/usulan_jalan/jenis_usulan_jalan.enum';
import { StrukturPerkerasan } from 'src/domain/usulan_jalan/struktur_perkerasan.enum';

export class UpdateUsulanJalanDto {
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsOptional()
    @IsEnum(JenisUsulanJalan)
    jenisUsulan?: JenisUsulanJalan;

    @IsOptional()
    @IsNumber()
    @Min(0)
    lebarJalan?: number;

    @IsOptional()
    @IsEnum(StrukturPerkerasan)
    strukturPerkerasan?: StrukturPerkerasan;

    @IsOptional()
    @IsNumber()
    @Min(0)
    sumbuKumulatif?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    nilaiCbr?: number;
}