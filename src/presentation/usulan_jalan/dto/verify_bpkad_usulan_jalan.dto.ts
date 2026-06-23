import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyBpkadUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanJalan!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idRekeningReview!: number;
}
