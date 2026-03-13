import { AsbBpsGalleryStd } from '../../../domain/asb_bps_gallery_std/asb_bps_gallery_std.entity';

export class AsbBpsGalleryStdPaginationResultDto {
    data: AsbBpsGalleryStd[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
