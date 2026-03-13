import { IsString, IsNotEmpty, Length, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateKabKotaDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 10)
    kode: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    nama: string;

    @IsNumber()
    @IsNotEmpty()
    provinceId: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
