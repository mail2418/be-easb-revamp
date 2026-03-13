import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteKecamatanDto {

    @IsInt()
    @IsNotEmpty()
    id: number;
}
