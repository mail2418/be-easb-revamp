import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateJenisStandarDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsString()
    @IsNotEmpty()
    jenis!: string;
}
