import { IsString, IsNumber, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateAsbFungsiRuangDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsOptional()
    @IsString()
    nama_fungsi_ruang?: string;

    @IsOptional()
    @IsNumber()
    koef?: number;
    
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
