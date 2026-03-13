import { Express } from 'express';
import { Injectable, NotFoundException } from "@nestjs/common";
import { ShstService } from "../../domain/shst/shst.service";
import { ShstRepository } from "../../domain/shst/shst.repository";
import { Shst } from "../../domain/shst/shst.entity";
import { CreateShstDto } from "../../presentation/shst/dto/create_shst.dto";
import { UpdateNominalShstDto } from "../../presentation/shst/dto/update_nominal_shst.dto";
import { GetShstDto } from "../../presentation/shst/dto/get_shst.dto";
import { GetShstDetailDto } from "../../presentation/shst/dto/get_shst_detail.dto";
import { GetShstFileDto } from "../../presentation/shst/dto/get_shst_file.dto";
import { ShstsPaginationResultDto } from "../../presentation/shst/dto/shsts_pagination_result.dto";
import { ValidateShstForeignKeysUseCase } from "./use_cases/validate_shst_foreign_keys.use_case";
import { HandleShstFileUseCase } from "./use_cases/handle_shst_file.use_case";
import { GetShstNominalDto } from './dto/get_shst_nominal.dto';

@Injectable()
export class ShstServiceImpl extends ShstService {
    constructor(
        private readonly shstRepository: ShstRepository,
        private readonly validateForeignKeysUseCase: ValidateShstForeignKeysUseCase,
        private readonly handleFileUseCase: HandleShstFileUseCase
    ) {
        super();
    }

    async create(dto: CreateShstDto, file: Express.Multer.File): Promise<Shst> {
        try {
            // File validation
            if (!file) {
                throw new Error("File is required");
            }

            const allowedMimeTypes = [
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-excel"
            ];

            if (!allowedMimeTypes.includes(file.mimetype)) {
                throw new Error("Only Excel files (.xlsx, .xls) are allowed");
            }

            if (file.size > 10 * 1024 * 1024) { // 10MB
                throw new Error("File size cannot exceed 10MB");
            }

            // Validate foreign keys using use case
            await this.validateForeignKeysUseCase.execute(dto);

            // Generate filename with timestamp format: YYYYMMDDHHmmss-{truncated_filename}-shst{tahun}.{ext}
            const now = new Date();
            const timestamp = now.getFullYear() +
                String(now.getMonth() + 1).padStart(2, '0') +
                String(now.getDate()).padStart(2, '0') +
                String(now.getHours()).padStart(2, '0') +
                String(now.getMinutes()).padStart(2, '0') +
                String(now.getSeconds()).padStart(2, '0');

            const originalExtension = file.originalname.split('.').pop();
            const truncatedName = file.originalname.substring(0, 150);
            const generatedFilename = `${timestamp}-${truncatedName}-shst${dto.tahun}.${originalExtension}`;

            // Save file using use case
            const filePath = await this.handleFileUseCase.saveFile(file, generatedFilename);

            const shstData = {
                ...dto,
                file: filePath
            };

            const newShst = await this.shstRepository.create(shstData);
            return newShst;
        } catch (error) {
            throw error;
        }
    }

    async delete(dto: GetShstDetailDto): Promise<boolean> {
        try {
            // Check if shst exists
            const existingShst = await this.shstRepository.findById(dto.id);
            if (!existingShst) {
                throw new NotFoundException(`Shst with id ${dto.id} not found`);
            }

            // Delete associated file using use case
            if (existingShst.file) {
                await this.handleFileUseCase.deleteFile(existingShst.file);
            }

            const deleteShstDto = { id: dto.id };
            return await this.shstRepository.delete(deleteShstDto);
        } catch (error) {
            throw error;
        }
    }

    async updateNominal(dto: UpdateNominalShstDto): Promise<Shst> {
        try {
            // Check if shst exists
            const existingShst = await this.shstRepository.findById(dto.id);
            if (!existingShst) {
                throw new NotFoundException(`Shst with id ${dto.id} not found`);
            }

            const updatedShst = await this.shstRepository.updateNominal(dto);
            return updatedShst;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetShstDto): Promise<ShstsPaginationResultDto> {
        try {
            const result = await this.shstRepository.findAll(dto);
            return {
                data: result.data,
                total: result.total,
                page: dto.page,
                amount: dto.amount,
                totalPages: Math.ceil(result.total / dto.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async findById(dto: GetShstDetailDto): Promise<Shst> {
        try {
            const shst = await this.shstRepository.findById(dto.id);
            if (!shst) {
                throw new NotFoundException(`Shst with id ${dto.id} not found`);
            }
            return shst;
        } catch (error) {
            throw error;
        }
    }

    async getFilePath(dto: GetShstFileDto): Promise<string> {
        try {
            const filePath = await this.shstRepository.findFileById(dto.id);
            if (!filePath) {
                throw new NotFoundException(`File for Shst with id ${dto.id} not found`);
            }
            return filePath;
        } catch (error) {
            throw error;
        }
    }

    async downloadFile(dto: GetShstFileDto): Promise<{ filePath: string; downloadUrl: string }> {
        try {
            const filePath = await this.getFilePath(dto);

            return {
                filePath,
                downloadUrl: `/public${filePath}`
            };
        } catch (error) {
            throw error;
        }
    }

    async getNominal(dto: GetShstNominalDto): Promise<number> {
        try {
            return await this.shstRepository.getNominal(dto);
        } catch (error) {
            throw error;
        }
    }
}
