import { IsNumber } from 'class-validator';

export class GetAsbBpsGalleryNonstdDetailDto {
    @IsNumber()
    id: number;
}
