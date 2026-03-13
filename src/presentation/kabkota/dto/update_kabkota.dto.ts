import { IsString, IsNotEmpty, Length, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class UpdateKabKotaDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsString()
    @IsOptional()
    @Length(1, 10)
    kode?: string;

    @IsString()
    @IsOptional()
    @Length(1, 255)
    nama?: string;

    @IsNumber()
    @IsOptional()
    provinceId?: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
