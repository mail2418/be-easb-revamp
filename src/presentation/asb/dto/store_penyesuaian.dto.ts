import { IsNumber, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class StorePenyesuaianDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id_asb!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value))
    penyesuaian_perencanaan_konstruksi!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value))
    penyesuaian_pengawasan_konstruksi!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value))
    penyesuaian_management_konstruksi!: number;
}
