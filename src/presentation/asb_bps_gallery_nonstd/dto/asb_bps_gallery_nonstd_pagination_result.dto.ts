import { AsbBpsGalleryNonstd } from '../../../domain/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.entity';

export class AsbBpsGalleryNonstdPaginationResultDto {
    data: AsbBpsGalleryNonstd[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
