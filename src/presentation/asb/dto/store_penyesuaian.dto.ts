import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class StorePenyesuaianDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id_asb!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) =>
        value !== undefined && value !== null && value !== '' ? parseFloat(value) : undefined,
    )
    penyesuaian_perencanaan_konstruksi?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) =>
        value !== undefined && value !== null && value !== '' ? parseFloat(value) : undefined,
    )
    penyesuaian_pengawasan_konstruksi?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) =>
        value !== undefined && value !== null && value !== '' ? parseFloat(value) : undefined,
    )
    penyesuaian_management_konstruksi?: number;
}
