import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { AsbBpsGalleryStd } from '../../domain/asb_bps_gallery_std/asb_bps_gallery_std.entity';
import { AsbBpsGalleryStdService } from '../../domain/asb_bps_gallery_std/asb_bps_gallery_std.service';
import { AsbBpsGalleryStdRepository } from '../../domain/asb_bps_gallery_std/asb_bps_gallery_std.repository';
import { ValidateFileUploadUseCase } from '../asb_bps_gallery_std/use_cases/validate_file_upload.use_case';
import { EnsureUploadDirectoryUseCase } from '../asb_bps_gallery_std/use_cases/ensure_upload_directory.use_case';
import { SaveFileUseCase } from '../asb_bps_gallery_std/use_cases/save_file.use_case';
import { DeleteFileUseCase } from '../asb_bps_gallery_std/use_cases/delete_file.use_case';
import { CreateAsbBpsGalleryStdDto } from '../../presentation/asb_bps_gallery_std/dto/create_asb_bps_gallery_std.dto';
import { UpdateAsbBpsGalleryStdDto } from '../../presentation/asb_bps_gallery_std/dto/update_asb_bps_gallery_std.dto';
import { GetAsbBpsGalleryStdListFilterDto } from '../../presentation/asb_bps_gallery_std/dto/get_asb_bps_gallery_std_list_filter.dto';
import { GetAsbBpsGalleryStdByAsbDto } from '../../presentation/asb_bps_gallery_std/dto/get_asb_bps_gallery_std_by_asb.dto';
import { Express } from 'express';

@Injectable()
export class AsbBpsGalleryStdServiceImpl extends AsbBpsGalleryStdService {
    constructor(
        private readonly repository: AsbBpsGalleryStdRepository,
        private readonly validateFileUpload: ValidateFileUploadUseCase,
        private readonly ensureUploadDir: EnsureUploadDirectoryUseCase,
        private readonly saveFile: SaveFileUseCase,
        private readonly deleteFile: DeleteFileUseCase,
    ) {
        super();
        this.ensureUploadDir.execute();
    }

    async create(
        dto: CreateAsbBpsGalleryStdDto,
        file: Express.Multer.File,
    ): Promise<AsbBpsGalleryStd> {
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
        dto: UpdateAsbBpsGalleryStdDto,
        file?: Express.Multer.File,
    ): Promise<AsbBpsGalleryStd> {
        try {
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbBpsGalleryStd with id ${id} not found`,
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
                    `AsbBpsGalleryStd with id ${id} not found`,
                );
            }

            this.deleteFile.execute(existing.filename);
            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbBpsGalleryStd> {
        try {
            const entity = await this.repository.findById(id);
            if (!entity) {
                throw new NotFoundException(
                    `AsbBpsGalleryStd with id ${id} not found`,
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
        filters?: GetAsbBpsGalleryStdListFilterDto,
    ): Promise<{ data: AsbBpsGalleryStd[]; total: number }> {
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

    async findByKomponenBangunanStdId(id: number): Promise<AsbBpsGalleryStd[]> {
        try {
            return await this.repository.findByKomponenBangunanStdId(id);
        } catch (error) {
            throw error;
        }
    }

    async getByAsb(dto: GetAsbBpsGalleryStdByAsbDto): Promise<{ data: AsbBpsGalleryStd[], total: number, page: number, amount: number, totalPages: number }> {
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
