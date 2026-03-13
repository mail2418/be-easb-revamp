import { IsString, IsNotEmpty, Length, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class UpdateSatuanDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsString()
    @IsOptional()
    @Length(1, 255)
    satuan?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
