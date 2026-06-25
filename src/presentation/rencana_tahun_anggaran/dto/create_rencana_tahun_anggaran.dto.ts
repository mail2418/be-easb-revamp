import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

export class CreateRencanaTahunAnggaranDto {
    @IsInt()
    @Min(2000)
    @Max(2100)
    tahun!: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
