import { IsNumber, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyPekerjaanDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_asb!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    perencanaan_konstruksi!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    pengawasan_konstruksi!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    management_konstruksi!: number;
}
