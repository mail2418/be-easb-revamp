import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteAsbDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_asb!: number;
}
