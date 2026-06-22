import { IsInt, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class DownloadDocumentsByAsbDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idAsb: number;

    @IsOptional()
    @IsString()
    view?: string;
}
