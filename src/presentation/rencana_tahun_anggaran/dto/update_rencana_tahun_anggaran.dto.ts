import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateRencanaTahunAnggaranDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsInt()
    @IsOptional()
    @Min(2000)
    @Max(2100)
    tahun?: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
