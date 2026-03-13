import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAsbStoreIndexDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    tahunAnggaran: number;

    @IsString()
    @IsNotEmpty()
    namaAsb: string;

    @IsString()
    @IsNotEmpty()
    alamat: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Type(() => Number)
    totalLantai: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    luasTanah?: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    idAsbTipeBangunan: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    idKabkota: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    jumlahKontraktor: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    idAsbJenis: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    idOpd?: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    idAsbStatus?: number;
}
