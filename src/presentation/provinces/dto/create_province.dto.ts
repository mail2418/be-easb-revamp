import { IsString, IsNotEmpty, Length, IsBoolean, IsOptional } from 'class-validator';

export class CreateProvinceDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 10)
    kode: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    nama: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
