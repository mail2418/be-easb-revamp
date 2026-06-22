import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyBpkadUsulanSaluranDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanSaluran!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idRekeningReview!: number;
}
