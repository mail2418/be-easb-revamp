import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class StoreIndexUsulanJalanDto {
    @IsOptional()
    @IsInt()
    id?: number;

    @IsInt()
    idAsbJenis!: number;

    @IsOptional()
    @IsInt()
    idJalanJenisPemeliharaan?: number;

    @IsInt()
    idJalanJenisPerkerasan!: number;

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

export class StoreInformasiUsulanJalanDto {
    @IsInt()
    idUsulanJalan!: number;

    @IsNumber()
    lebar!: number;

    @IsInt()
    idRekening!: number;

    @IsArray()
    data_ruang_lingkup!: Record<string, unknown>[];

    @IsOptional()
    @IsArray()
    data_smkk?: Record<string, unknown>[];
}

export class VerifyIndexUsulanJalanDto {
    @IsInt()
    idUsulanJalan!: number;

    @IsInt()
    idAsbJenis!: number;

    @IsOptional()
    @IsInt()
    idJalanJenisPemeliharaan?: number;

    @IsInt()
    idJalanJenisPerkerasan!: number;

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

export class VerifyInformasiUsulanJalanDto {
    @IsInt()
    idUsulanJalan!: number;

    @IsOptional()
    @IsNumber()
    lebar?: number;

    @IsArray()
    data_ruang_lingkup!: Record<string, unknown>[];

    @IsOptional()
    @IsArray()
    data_smkk?: Record<string, unknown>[];
}

export class VerifyAdbangUsulanJalanDto {
    @IsInt()
    idUsulanJalan!: number;
}

export class VerifyBpkadUsulanJalanDto {
    @IsInt()
    idUsulanJalan!: number;

    @IsOptional()
    @IsInt()
    idRekeningReview?: number;
}

export class VerifyBappedaUsulanJalanDto {
    @IsInt()
    idUsulanJalan!: number;
}

export class RejectUsulanJalanDto {
    @IsInt()
    idUsulanJalan!: number;

    @IsString()
    rejectReason!: string;
}

export class DeleteUsulanJalanDto {
    @IsInt()
    idUsulanJalan!: number;
}

export class GetUsulanJalanListDto {
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
}
