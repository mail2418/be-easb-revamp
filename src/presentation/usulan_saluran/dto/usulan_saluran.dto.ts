import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class StoreIndexUsulanSaluranDto {
    @IsOptional()
    @IsInt()
    id?: number;

    @IsOptional()
    @IsInt()
    idUsulanSaluran?: number;

    @IsInt()
    idAsbJenis!: number;

    @IsInt()
    idTipeSaluran!: number;

    @IsInt()
    idKabkota!: number;

    @IsInt()
    idKecamatan!: number;

    @IsInt()
    idKelurahan!: number;

    @IsInt()
    tahunAnggaran!: number;

    @IsString()
    namaUsulan!: string;

    @IsOptional()
    @IsString()
    alamat?: string;
}

export class StoreInformasiUsulanSaluranDto {
    @IsInt()
    idUsulanSaluran!: number;

    @IsNumber()
    lebar!: number;

    @IsInt()
    idRekening!: number;

    @IsArray()
    data_ruang_lingkup!: Record<string, unknown>[];

    @IsOptional()
    @IsArray()
    data_smkk?: Record<string, unknown>[];

    @IsOptional()
    @IsString()
    keteranganTambahan?: string;
}

export class VerifyIndexUsulanSaluranDto {
    @IsInt()
    idUsulanSaluran!: number;

    @IsInt()
    idAsbJenis!: number;

    @IsInt()
    idTipeSaluran!: number;

    @IsInt()
    idKabkota!: number;

    @IsInt()
    idKecamatan!: number;

    @IsInt()
    idKelurahan!: number;

    @IsInt()
    tahunAnggaran!: number;

    @IsString()
    namaUsulan!: string;

    @IsOptional()
    @IsString()
    alamat?: string;
}

export class VerifyInformasiUsulanSaluranDto {
    @IsInt()
    idUsulanSaluran!: number;

    @IsOptional()
    @IsNumber()
    lebar?: number;

    @IsArray()
    data_ruang_lingkup!: Record<string, unknown>[];

    @IsOptional()
    @IsArray()
    data_smkk?: Record<string, unknown>[];
}

export class VerifyAdbangUsulanSaluranDto {
    @IsInt()
    idUsulanSaluran!: number;
}

export class VerifyBpkadUsulanSaluranDto {
    @IsInt()
    idUsulanSaluran!: number;

    @IsOptional()
    @IsInt()
    idRekeningReview?: number;
}

export class VerifyBappedaUsulanSaluranDto {
    @IsInt()
    idUsulanSaluran!: number;
}

export class RejectUsulanSaluranDto {
    @IsInt()
    idUsulanSaluran!: number;

    @IsString()
    rejectReason!: string;
}

export class DeleteUsulanSaluranDto {
    @IsInt()
    idUsulanSaluran!: number;
}

export class GetUsulanSaluranListDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    amount?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    tahunAnggaran?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    idUsulanSaluranStatus?: number;

    @IsOptional()
    @IsString()
    namaUsulanSaluran?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    idKabkota?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    idKecamatan?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    idKelurahan?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    idTipeSaluran?: number;
}
