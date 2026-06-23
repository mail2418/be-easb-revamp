import { IsArray, IsNumber, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class StoreBpnsDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id_asb!: number;

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ value }) => (Array.isArray(value) ? value.map((v) => parseFloat(v)) : value))
    komponen_nonstd!: number[];

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ value }) => (Array.isArray(value) ? value.map((v) => parseFloat(v)) : value))
    bobot_nonstd!: number[];
}
