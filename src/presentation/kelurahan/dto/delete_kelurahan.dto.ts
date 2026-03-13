import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteKelurahanDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}
