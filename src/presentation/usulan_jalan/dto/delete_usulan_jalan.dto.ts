import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    idUsulanJalan: number;
}


