import { IsArray, IsNotEmpty, IsNumber, ValidateNested, ArrayMinSize } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { DataRuangLingkupDto } from './data_ruang_lingkup.dto';

export class StoreInformasiUsulanJalanDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanJalan!: number;

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
}


