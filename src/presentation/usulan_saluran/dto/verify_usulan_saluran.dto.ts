import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyUsulanSaluranDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanSaluran!: number;
}
