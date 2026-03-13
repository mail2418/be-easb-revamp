import { Express } from 'express';
import { AsbBpsGalleryStd } from './asb_bps_gallery_std.entity';
import { CreateAsbBpsGalleryStdDto } from '../../presentation/asb_bps_gallery_std/dto/create_asb_bps_gallery_std.dto';
import { UpdateAsbBpsGalleryStdDto } from '../../presentation/asb_bps_gallery_std/dto/update_asb_bps_gallery_std.dto';
import { GetAsbBpsGalleryStdListFilterDto } from '../../presentation/asb_bps_gallery_std/dto/get_asb_bps_gallery_std_list_filter.dto';
import { GetAsbBpsGalleryStdByAsbDto } from '../../presentation/asb_bps_gallery_std/dto/get_asb_bps_gallery_std_by_asb.dto';

export abstract class AsbBpsGalleryStdService {
    abstract create(
        dto: CreateAsbBpsGalleryStdDto,
        file: Express.Multer.File,
    ): Promise<AsbBpsGalleryStd>;
    abstract update(
        id: number,
        dto: UpdateAsbBpsGalleryStdDto,
        file?: Express.Multer.File,
    ): Promise<AsbBpsGalleryStd>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbBpsGalleryStd>;
    abstract findAll(
        page: number,
        amount: number,
        filters?: GetAsbBpsGalleryStdListFilterDto,
    ): Promise<{ data: AsbBpsGalleryStd[]; total: number }>;
    abstract findByKomponenBangunanStdId(id: number): Promise<AsbBpsGalleryStd[]>;
    abstract getByAsb(dto: GetAsbBpsGalleryStdByAsbDto): Promise<{ data: AsbBpsGalleryStd[], total: number, page: number, amount: number, totalPages: number }>;
}
