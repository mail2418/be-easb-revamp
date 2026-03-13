import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteStandardKlasifikasiDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
