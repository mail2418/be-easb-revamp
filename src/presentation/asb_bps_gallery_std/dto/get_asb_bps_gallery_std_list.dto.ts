import { IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAsbBpsGalleryStdListDto {
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1)
    page: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1)
    amount: number;
}
