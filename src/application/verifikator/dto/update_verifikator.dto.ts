import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { JenisVerifikator } from '../../../domain/verifikator/jenis_verifikator.enum';

export class UpdateVerifikatorDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsNumber()
    @IsOptional()
    idUser?: number;

    @IsEnum(JenisVerifikator)
    @IsOptional()
    jenisVerifikator?: JenisVerifikator;

    @IsString()
    @IsOptional()
    verifikator?: string;
}
