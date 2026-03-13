import { IsNumber } from 'class-validator';

export class DeleteAsbBpsGalleryNonstdDto {
    @IsNumber()
    id: number;
}
