import { IsString, IsNotEmpty, Length, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class UpdateProvinceDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsOptional()
    @Length(1, 10)
    kode?: string;

    @IsString()
    @IsOptional()
    @Length(1, 255)
    nama?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
