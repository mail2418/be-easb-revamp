import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class RejectDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id_asb!: number;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    reject_reason!: string;
}
