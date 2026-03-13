import { Express } from 'express';
import { CreateAsbBpsGalleryNonstdDto } from '../../presentation/asb_bps_gallery_nonstd/dto/create_asb_bps_gallery_nonstd.dto';
import { UpdateAsbBpsGalleryNonstdDto } from '../../presentation/asb_bps_gallery_nonstd/dto/update_asb_bps_gallery_nonstd.dto';
import { GetAsbBpsGalleryNonstdListFilterDto } from '../../presentation/asb_bps_gallery_nonstd/dto/get_asb_bps_gallery_nonstd_list_filter.dto';
import { GetAsbBpsGalleryNonstdByAsbDto } from '../../presentation/asb_bps_gallery_nonstd/dto/get_asb_bps_gallery_nonstd_by_asb.dto';
import { AsbBpsGalleryNonstd } from './asb_bps_gallery_nonstd.entity';

export abstract class AsbBpsGalleryNonstdService {
    abstract create(
        dto: CreateAsbBpsGalleryNonstdDto,
        file: Express.Multer.File,
    ): Promise<AsbBpsGalleryNonstd>;
    abstract update(
        id: number,
        dto: UpdateAsbBpsGalleryNonstdDto,
        file?: Express.Multer.File,
    ): Promise<AsbBpsGalleryNonstd>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbBpsGalleryNonstd>;
    abstract findAll(
        page: number,
        amount: number,
        filters?: GetAsbBpsGalleryNonstdListFilterDto,
    ): Promise<{ data: AsbBpsGalleryNonstd[]; total: number }>;
    abstract findByKomponenBangunanNonstdId(id: number): Promise<AsbBpsGalleryNonstd[]>;
    abstract getByAsb(dto: GetAsbBpsGalleryNonstdByAsbDto): Promise<{ data: AsbBpsGalleryNonstd[], total: number, page: number, amount: number, totalPages: number }>;
}
