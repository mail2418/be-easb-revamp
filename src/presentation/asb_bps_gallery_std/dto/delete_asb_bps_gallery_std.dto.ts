import { IsNumber, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteAsbBpsGalleryStdDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id!: number;
}
