import { IsArray, IsNotEmpty, IsNumber, ValidateNested, ArrayMinSize, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { DataRuangLingkupDto } from '../../usulan_jalan/dto/data_ruang_lingkup.dto';
import { DataSmkkDto } from '../../usulan_jalan/dto/data_smkk.dto';

export class StoreInformasiUsulanSaluranDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanSaluran!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value))
    lebar!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idRekening!: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => DataRuangLingkupDto)
    data_ruang_lingkup!: DataRuangLingkupDto[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => DataSmkkDto)
    data_smkk?: DataSmkkDto[];

    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value != null && value !== '') ? String(value).trim() : undefined)
    keteranganTambahan?: string;
}
