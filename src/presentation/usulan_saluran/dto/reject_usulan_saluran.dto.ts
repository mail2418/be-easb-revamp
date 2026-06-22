import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class RejectUsulanSaluranDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanSaluran!: number;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    rejectReason!: string;
}
