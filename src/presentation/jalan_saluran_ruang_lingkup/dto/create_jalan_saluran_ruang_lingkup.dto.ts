import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateJalanSaluranRuangLingkupDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id_jenis_usulan!: number;

    @IsNotEmpty()
    @IsString()
    deskripsi_ruang_lingkup!: string;
}
