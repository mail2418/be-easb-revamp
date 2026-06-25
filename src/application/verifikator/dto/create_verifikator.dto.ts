import { IsString, IsNotEmpty, IsNumber, IsEnum, Min } from 'class-validator';
import { JenisVerifikator } from '../../../domain/verifikator/jenis_verifikator.enum';

export class CreateVerifikatorDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    idUser!: number;

    @IsEnum(JenisVerifikator)
    @IsNotEmpty()
    jenisVerifikator!: JenisVerifikator;

    @IsString()
    @IsNotEmpty()
    verifikator!: string;
}
