import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanJalan: number;
}
