import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ValidateFileUploadUseCase } from '../asb_bps_gallery_nonstd/use_cases/validate_file_upload.use_case';
import { EnsureUploadDirectoryUseCase } from '../asb_bps_gallery_nonstd/use_cases/ensure_upload_directory.use_case';
import { SaveFileUseCase } from '../asb_bps_gallery_nonstd/use_cases/save_file.use_case';
import { DeleteFileUseCase } from '../asb_bps_gallery_nonstd/use_cases/delete_file.use_case';
import { CreateAsbBpsGalleryNonstdDto } from '../../presentation/asb_bps_gallery_nonstd/dto/create_asb_bps_gallery_nonstd.dto';
import { UpdateAsbBpsGalleryNonstdDto } from '../../presentation/asb_bps_gallery_nonstd/dto/update_asb_bps_gallery_nonstd.dto';
import { GetAsbBpsGalleryNonstdListFilterDto } from '../../presentation/asb_bps_gallery_nonstd/dto/get_asb_bps_gallery_nonstd_list_filter.dto';
import { GetAsbBpsGalleryNonstdByAsbDto } from '../../presentation/asb_bps_gallery_nonstd/dto/get_asb_bps_gallery_nonstd_by_asb.dto';
import { AsbBpsGalleryNonstd } from '../../domain/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.entity';
import { AsbBpsGalleryNonstdRepository } from '../../domain/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.repository';
import { AsbBpsGalleryNonstdService } from '../../domain/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.service';
import { Express } from 'express';

@Injectable()
export class AsbBpsGalleryNonstdServiceImpl extends AsbBpsGalleryNonstdService {
    constructor(
        private readonly repository: AsbBpsGalleryNonstdRepository,
        private readonly validateFileUpload: ValidateFileUploadUseCase,
        private readonly ensureUploadDir: EnsureUploadDirectoryUseCase,
        private readonly saveFile: SaveFileUseCase,
        private readonly deleteFile: DeleteFileUseCase,
    ) {
        super();
        this.ensureUploadDir.execute();
    }

    async create(
        dto: CreateAsbBpsGalleryNonstdDto,
        file: Express.Multer.File,
    ): Promise<AsbBpsGalleryNonstd> {
        try {
            this.validateFileUpload.execute(file);
            const filepath = this.saveFile.execute(file);
            return await this.repository.create(dto, filepath);
        } catch (error) {
            throw error;
        }
    }

    async update(
        id: number,
        dto: UpdateAsbBpsGalleryNonstdDto,
        file?: Express.Multer.File,
    ): Promise<AsbBpsGalleryNonstd> {
        try {
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbBpsGalleryNonstd with id ${id} not found`,
                );
            }

            let filepath: string | undefined = undefined;

            if (file) {
                this.validateFileUpload.execute(file);
                this.deleteFile.execute(existing.filename);
                filepath = this.saveFile.execute(file);
            }

            return await this.repository.update(id, dto, filepath);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbBpsGalleryNonstd with id ${id} not found`,
                );
            }

            this.deleteFile.execute(existing.filename);
            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbBpsGalleryNonstd> {
        try {
            const entity = await this.repository.findById(id);
            if (!entity) {
                throw new NotFoundException(
                    `AsbBpsGalleryNonstd with id ${id} not found`,
                );
            }
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async findAll(
        page: number,
        amount: number,
        filters?: GetAsbBpsGalleryNonstdListFilterDto,
    ): Promise<{ data: AsbBpsGalleryNonstd[]; total: number }> {
        try {
            const [data, total] = await this.repository.findAll(
                page,
                amount,
                filters,
            );
            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async findByKomponenBangunanNonstdId(id: number): Promise<AsbBpsGalleryNonstd[]> {
        try {
            return await this.repository.findByKomponenBangunanNonstdId(id);
        } catch (error) {
            throw error;
        }
    }

    async getByAsb(dto: GetAsbBpsGalleryNonstdByAsbDto): Promise<{ data: AsbBpsGalleryNonstd[], total: number, page: number, amount: number, totalPages: number }> {
        try {
            const [data, total] = await this.repository.findByAsb(dto.idAsb, dto.page, dto.amount);
            return {
                data,
                total,
                page: dto.page,
                amount: dto.amount,
                totalPages: Math.ceil(total / dto.amount)
            };
        } catch (error) {
            throw error;
        }
    }
}
