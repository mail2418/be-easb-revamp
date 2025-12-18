import { IsString, IsNumber, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAsbFungsiRuangDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id!: number;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    nama_fungsi_ruang?: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    koef?: number;
    
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true || value === 1)
    isActive?: boolean;
}
