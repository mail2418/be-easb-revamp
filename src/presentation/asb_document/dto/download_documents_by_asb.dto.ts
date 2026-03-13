import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DownloadDocumentsByAsbDto {
    @IsInt()
    @Type(() => Number)
    idAsb: number;

    @IsOptional()
    @IsString()
    view?: string;
}
