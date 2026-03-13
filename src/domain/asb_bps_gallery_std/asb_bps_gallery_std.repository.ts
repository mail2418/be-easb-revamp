import { AsbBpsGalleryStd } from './asb_bps_gallery_std.entity';
import { CreateAsbBpsGalleryStdDto } from '../../presentation/asb_bps_gallery_std/dto/create_asb_bps_gallery_std.dto';
import { UpdateAsbBpsGalleryStdDto } from '../../presentation/asb_bps_gallery_std/dto/update_asb_bps_gallery_std.dto';
import { GetAsbBpsGalleryStdListFilterDto } from '../../presentation/asb_bps_gallery_std/dto/get_asb_bps_gallery_std_list_filter.dto';

export abstract class AsbBpsGalleryStdRepository {
    abstract create(
        dto: CreateAsbBpsGalleryStdDto,
        filename: string,
    ): Promise<AsbBpsGalleryStd>;
    abstract update(
        id: number,
        dto: UpdateAsbBpsGalleryStdDto,
        filename?: string,
    ): Promise<AsbBpsGalleryStd>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbBpsGalleryStd | null>;
    abstract findAll(
        page: number,
        amount: number,
        filters?: GetAsbBpsGalleryStdListFilterDto,
    ): Promise<[AsbBpsGalleryStd[], number]>;
    abstract findByKomponenBangunanStdId(id: number): Promise<AsbBpsGalleryStd[]>;
    abstract findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBpsGalleryStd[], number]>;
}
