import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class VerifyUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    idUsulanJalan: number;
}


