import { Express } from 'express';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { AsbJakonService } from '../../domain/asb_jakon/asb_jakon.service';
import { AsbJakonRepository } from '../../domain/asb_jakon/asb_jakon.repository';
import { BulkCreateAsbJakonDto } from './dto/bulk_create_asb_jakon.dto';
import { AsbJakon } from '../../domain/asb_jakon/asb_jakon.entity';
import { CreateAsbJakonDto } from '../../presentation/asb_jakon/dto/create_asb_jakon.dto';
import { CreateBulkAsbJakonDto } from '../../presentation/asb_jakon/dto/create_bulk_asb_jakon.dto';
import { CreateBulkAsbJakonResultDto } from '../../presentation/asb_jakon/dto/create_bulk_asb_jakon_result.dto';
import { UpdateAsbJakonDto } from '../../presentation/asb_jakon/dto/update_asb_jakon.dto';
import { DeleteAsbJakonDto } from '../../presentation/asb_jakon/dto/delete_asb_jakon.dto';
import { GetAsbJakonListDto } from '../../presentation/asb_jakon/dto/get_asb_jakon_list.dto';
import { GetAsbJakonDetailDto } from '../../presentation/asb_jakon/dto/get_asb_jakon_detail.dto';
import { ValidatePriceRangeUseCase } from './use_cases/validate_price_range.use_case';
import { ValidateExcelFileUseCase } from './use_cases/validate_excel_file.use_case';
import { ValidateExcelHeadersUseCase } from './use_cases/validate_excel_headers.use_case';
import { ParseExcelDataUseCase } from './use_cases/parse_excel_data.use_case';
import { HandleJakonFileUseCase } from './use_cases/handle_jakon_file.use_case';
import { GenerateExcelTemplateUseCase } from './use_cases/generate_excel_template.use_case';
import { GetAsbJakonListFilterDto } from '../../presentation/asb_jakon/dto/get_asb_jakon_list_filter.dto';
import { GetJakonByPriceRangeDto } from './dto/get_jakon_by_price_range.dto';
import { AsbJakonWithRelationsDto } from './dto/asb_jakon_with_relations.dto';
@Injectable()
export class AsbJakonServiceImpl implements AsbJakonService {
    constructor(
        private readonly repository: AsbJakonRepository,
        private readonly validatePriceRange: ValidatePriceRangeUseCase,
        private readonly validateExcelFileUseCase: ValidateExcelFileUseCase,
        private readonly validateExcelHeadersUseCase: ValidateExcelHeadersUseCase,
        private readonly parseExcelDataUseCase: ParseExcelDataUseCase,
        private readonly handleFileUseCase: HandleJakonFileUseCase,
        private readonly generateExcelTemplateUseCase: GenerateExcelTemplateUseCase,
    ) { }

    async create(dto: CreateAsbJakonDto): Promise<AsbJakon> {
        try {
            this.validatePriceRange.execute(dto.priceFrom, dto.priceTo);
            return this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbJakonDto): Promise<AsbJakon> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbJakon with id ${dto.id} not found`);
            }
            const priceFrom = dto.priceFrom !== undefined ? dto.priceFrom : existing.priceFrom;
            const priceTo = dto.priceTo !== undefined ? dto.priceTo : existing.priceTo;
            this.validatePriceRange.execute(priceFrom, priceTo);
            const updateData: Partial<AsbJakon> = {
                idAsbTipeBangunan: dto.idAsbTipeBangunan,
                idAsbJenis: dto.idAsbJenis,
                idAsbKlasifikasi: dto.idAsbKlasifikasi,
                tahun: dto.tahun,
                type: dto.type,
                nama: dto.nama,
                spec: dto.spec,
                priceFrom: dto.priceFrom,
                priceTo: dto.priceTo,
                satuan: dto.satuan,
                standard: dto.standard,
            };
            // remove undefined
            Object.keys(updateData).forEach(k => {
                if (updateData[k as keyof typeof updateData] === undefined) {
                    delete updateData[k as keyof typeof updateData];
                }
            });
            return this.repository.update(dto.id, updateData);
        } catch (error) {
            throw error;
        }
    }

    async delete(dto: DeleteAsbJakonDto): Promise<boolean> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbJakon with id ${dto.id} not found`);
            }
            return this.repository.delete(dto.id);
        } catch (error) {
            throw error;
        }
    }

    async getAll(pagination: GetAsbJakonListDto): Promise<any> {
        try {
            const page = pagination.page ?? 1;
            const amount = pagination.amount ?? 10;
            const paginationData = { page, amount };
            const result = await this.repository.findAll(paginationData);
            return {
                data: result.data,
                total: result.total,
                page,
                amount,
                totalPages: Math.ceil(result.total / amount),
            };
        } catch (error) {
            throw error;
        }
    }

    async getDetail(dto: GetAsbJakonDetailDto): Promise<AsbJakonWithRelationsDto> {
        try {
            const entity = await this.repository.findById(dto.id);
            if (!entity) {
                throw new NotFoundException(`AsbJakon with id ${dto.id} not found`);
            }
            return entity as AsbJakonWithRelationsDto;
        } catch (error) {
            throw error;
        }
    }

    async findByAsbJenisId(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]> {
        try {
            if (!dto.idAsbJenis) {
                throw new BadRequestException('idAsbJenis is required');
            }
            return await this.repository.findByAsbJenisId(dto.idAsbJenis);
        } catch (error) {
            throw error;
        }
    }

    async findByAsbTipeBangunanId(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]> {
        try {
            if (!dto.idAsbTipeBangunan) {
                throw new BadRequestException('idAsbTipeBangunan is required');
            }
            return await this.repository.findByAsbTipeBangunanId(dto.idAsbTipeBangunan);
        } catch (error) {
            throw error;
        }
    }

    async findByAsbKlasifikasiId(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]> {
        try {
            if (!dto.idAsbKlasifikasi) {
                throw new BadRequestException('idAsbKlasifikasi is required');
            }
            return await this.repository.findByAsbKlasifikasiId(dto.idAsbKlasifikasi);
        } catch (error) {
            throw error;
        }
    }

    async findByTahun(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]> {
        try {
            if (!dto.tahun) {
                throw new BadRequestException('tahun is required');
            }
            return await this.repository.findByTahun(dto.tahun);
        } catch (error) {
            throw error;
        }
    }

    async findByType(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]> {
        try {
            if (!dto.type) {
                throw new BadRequestException('type is required');
            }
            return await this.repository.findByType(dto.type);
        } catch (error) {
            throw error;
        }
    }

    async getJakonByPriceRange(dto: GetJakonByPriceRangeDto): Promise<AsbJakon | null> {
        try {
            const jakon = await this.repository.findByPriceRange(dto);
            return jakon;
        } catch (error) {
            throw error;
        }
    }

    async createBulk(dto: CreateBulkAsbJakonDto, file: Express.Multer.File): Promise<CreateBulkAsbJakonResultDto> {
        try {
            // 1. Validate Excel file (type, size, extension)
            this.validateExcelFileUseCase.execute(file);

            // 2. Read Excel file and validate headers
            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            this.validateExcelHeadersUseCase.execute(workbook);

            // 3. Parse Excel data and lookup IDs
            const parsedData = await this.parseExcelDataUseCase.execute(file);

            // 4. Generate filename with format: YYYYMMDDHHmm-jakon{tahun}.{ext}
            const generatedFilename = this.handleFileUseCase.generateFilename(
                file,
                dto.tahun
            );

            // 5. Save file using use case
            const filePath = await this.handleFileUseCase.saveFile(file, generatedFilename);

            // 6. Prepare bulk create DTOs
            const bulkCreateDtos: BulkCreateAsbJakonDto[] = parsedData.map(row => ({
                tahun: dto.tahun,
                file: filePath,
                idAsbTipeBangunan: row.idAsbTipeBangunan,
                idAsbJenis: row.idAsbJenis,
                idAsbKlasifikasi: row.idAsbKlasifikasi,
                type: row.type,
                nama: row.nama,
                spec: row.spec,
                priceFrom: row.priceFrom,
                priceTo: row.priceTo,
                satuan: row.satuan,
                standard: row.standard,
            }));

            // 7. Bulk insert with transaction
            const createdJakons = await this.repository.bulkCreate(bulkCreateDtos);

            const result = new CreateBulkAsbJakonResultDto();
            result.created = createdJakons.length;
            result.data = createdJakons;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async downloadTemplate(): Promise<{ buffer: Buffer; filename: string }> {
        try {
            const buffer = await this.generateExcelTemplateUseCase.execute();
            const filename = `Jakon_Template_${new Date().getFullYear()}.xlsx`;
            
            return {
                buffer,
                filename,
            };
        } catch (error) {
            throw error;
        }
    }
}
