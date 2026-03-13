import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { JenisUsulanJalan } from '../../../domain/usulan_jalan/jenis_usulan_jalan.enum';
import { StrukturPerkerasan } from '../../../domain/usulan_jalan/struktur_perkerasan.enum';

export class CreateUsulanJalanDto {
    @IsEnum(JenisUsulanJalan)
    @IsNotEmpty()
    jenisUsulan!: JenisUsulanJalan;

    @IsNumber()
    @IsNotEmpty()
    lebarJalan!: number;

    @IsEnum(StrukturPerkerasan)
    @IsNotEmpty()
    strukturPerkerasan!: StrukturPerkerasan;

    @IsNumber()
    @IsNotEmpty()
    sumbuKumulatif!: number;

    @IsNumber()
    @IsNotEmpty()
    nilaiCbr!: number;
}
