import { Express } from 'express';
import { Injectable, NotFoundException } from "@nestjs/common";
import * as XLSX from 'xlsx';
import { ShstService } from "../../domain/shst/shst.service";
import { ShstRepository } from "../../domain/shst/shst.repository";
import { BulkCreateShstDto } from "./dto/bulk_create_shst.dto";
import { Shst } from "../../domain/shst/shst.entity";
import { CreateShstDto } from "../../presentation/shst/dto/create_shst.dto";
import { UpdateNominalShstDto } from "../../presentation/shst/dto/update_nominal_shst.dto";
import { GetShstDto } from "../../presentation/shst/dto/get_shst.dto";
import { GetShstDetailDto } from "../../presentation/shst/dto/get_shst_detail.dto";
import { GetShstFileDto } from "../../presentation/shst/dto/get_shst_file.dto";
import { ShstsPaginationResultDto } from "../../presentation/shst/dto/shsts_pagination_result.dto";
import { CreateShstResultDto } from "../../presentation/shst/dto/create_shst_result.dto";
import { ValidateExcelFileUseCase } from "./use_cases/validate_excel_file.use_case";
import { ValidateExcelHeadersUseCase } from "./use_cases/validate_excel_headers.use_case";
import { ParseExcelDataUseCase } from "./use_cases/parse_excel_data.use_case";
import { HandleShstFileUseCase } from "./use_cases/handle_shst_file.use_case";
import { GenerateExcelTemplateUseCase } from "./use_cases/generate_excel_template.use_case";
import { GetShstNominalDto } from './dto/get_shst_nominal.dto';
import { ShstWithRelationsDto } from './dto/shst_with_relations.dto';

@Injectable()
export class ShstServiceImpl extends ShstService {
    constructor(
        private readonly shstRepository: ShstRepository,
        private readonly validateExcelFileUseCase: ValidateExcelFileUseCase,
        private readonly validateExcelHeadersUseCase: ValidateExcelHeadersUseCase,
        private readonly parseExcelDataUseCase: ParseExcelDataUseCase,
        private readonly handleFileUseCase: HandleShstFileUseCase,
        private readonly generateExcelTemplateUseCase: GenerateExcelTemplateUseCase,
    ) {
        super();
    }

    async create(dto: CreateShstDto, file: Express.Multer.File): Promise<CreateShstResultDto> {
        try {
            // 1. Validate Excel file (type, size, extension)
            this.validateExcelFileUseCase.execute(file);

            // 2. Read Excel file and validate headers
            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            this.validateExcelHeadersUseCase.execute(workbook);

            // 3. Parse Excel data and lookup IDs
            const parsedData = await this.parseExcelDataUseCase.execute(file);

            // 4. Generate filename with format: YYYYMMDDHHmm-{nama_kabkota}-shst{tahun}.{ext}
            const generatedFilename = this.handleFileUseCase.generateFilename(
                file,
                parsedData.namaKabkota,
                dto.tahun
            );

            // 5. Save file using use case
            const filePath = await this.handleFileUseCase.saveFile(file, generatedFilename);

            // 6. Prepare bulk create DTOs
            const bulkCreateDtos: BulkCreateShstDto[] = parsedData.rows.map(row => ({
                tahun: dto.tahun,
                file: filePath,
                id_asb_tipe_bangunan: row.id_asb_tipe_bangunan,
                id_asb_klasifikasi: row.id_asb_klasifikasi,
                id_kabkota: row.id_kabkota,
                nominal: row.nominal,
            }));

            // 7. Bulk insert with transaction
            const createdShsts = await this.shstRepository.bulkCreate(bulkCreateDtos);

            const result = new CreateShstResultDto();
            result.created = createdShsts.length;
            result.data = createdShsts;
            return result;
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
            const page = dto.page ?? 1;
            const amount = dto.amount ?? result.total;
            return {
                data: result.data,
                total: result.total,
                page,
                amount,
                totalPages: amount > 0 ? Math.ceil(result.total / amount) : 0
            };
        } catch (error) {
            throw error;
        }
    }

    async findById(dto: GetShstDetailDto): Promise<ShstWithRelationsDto> {
        try {
            const shst = await this.shstRepository.findById(dto.id);
            if (!shst) {
                throw new NotFoundException(`Shst with id ${dto.id} not found`);
            }
            return shst as ShstWithRelationsDto;
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

    async downloadTemplate(): Promise<{ buffer: Buffer; filename: string }> {
        try {
            const buffer = await this.generateExcelTemplateUseCase.execute();
            const filename = `SHST_Template_${new Date().getFullYear()}.xlsx`;
            
            return {
                buffer,
                filename,
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
