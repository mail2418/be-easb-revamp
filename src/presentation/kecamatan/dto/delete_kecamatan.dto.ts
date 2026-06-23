import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteKecamatanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id: number;
}
