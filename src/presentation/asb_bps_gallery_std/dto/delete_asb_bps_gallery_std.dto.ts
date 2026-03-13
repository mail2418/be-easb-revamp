import { IsNumber } from 'class-validator';

export class DeleteAsbBpsGalleryStdDto {
    @IsNumber()
    id: number;
}
