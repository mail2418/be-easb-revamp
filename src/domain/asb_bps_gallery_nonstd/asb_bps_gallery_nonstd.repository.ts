import { AsbBpsGalleryNonstd } from './asb_bps_gallery_nonstd.entity';
import { CreateAsbBpsGalleryNonstdDto } from '../../presentation/asb_bps_gallery_nonstd/dto/create_asb_bps_gallery_nonstd.dto';
import { UpdateAsbBpsGalleryNonstdDto } from '../../presentation/asb_bps_gallery_nonstd/dto/update_asb_bps_gallery_nonstd.dto';
import { GetAsbBpsGalleryNonstdListFilterDto } from '../../presentation/asb_bps_gallery_nonstd/dto/get_asb_bps_gallery_nonstd_list_filter.dto';

export abstract class AsbBpsGalleryNonstdRepository {
    abstract create(
        dto: CreateAsbBpsGalleryNonstdDto,
        filename: string,
    ): Promise<AsbBpsGalleryNonstd>;
    abstract update(
        id: number,
        dto: UpdateAsbBpsGalleryNonstdDto,
        filename?: string,
    ): Promise<AsbBpsGalleryNonstd>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbBpsGalleryNonstd | null>;
    abstract findAll(
        page: number,
        amount: number,
        filters?: GetAsbBpsGalleryNonstdListFilterDto,
    ): Promise<[AsbBpsGalleryNonstd[], number]>;
    abstract findByKomponenBangunanNonstdId(id: number): Promise<AsbBpsGalleryNonstd[]>;
    abstract findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBpsGalleryNonstd[], number]>;
}
