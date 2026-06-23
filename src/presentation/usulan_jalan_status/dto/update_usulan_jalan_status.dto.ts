import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUsulanJalanStatusDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsString()
    @IsOptional()
    status?: string;
}
