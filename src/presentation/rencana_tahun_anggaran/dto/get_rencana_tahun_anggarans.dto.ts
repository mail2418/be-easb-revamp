import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetRencanaTahunAnggaransDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    page?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    amount?: number;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === undefined || value === null || value === '') return undefined;
        if (value === 'true' || value === true) return true;
        if (value === 'false' || value === false) return false;
        return undefined;
    })
    isActive?: boolean;
}
