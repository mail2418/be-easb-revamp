import { IsNumber } from 'class-validator';

export class GetAsbBpsGalleryStdDetailDto {
    @IsNumber()
    id: number;
}
