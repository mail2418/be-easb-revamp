import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Express } from 'express';
import { HspkService } from '../../domain/hspk/hspk.service';
import { HspkRepository } from '../../domain/hspk/hspk.repository';
import { Hspk } from '../../domain/hspk/hspk.entity';
import { CreateHspkDto } from '../../presentation/hspk/dto/create_hspk.dto';
import { UpdateHspkDto } from '../../presentation/hspk/dto/update_hspk.dto';
import { GetHspkDto } from '../../presentation/hspk/dto/get_hspk.dto';
import { HspkPaginationResultDto } from '../../presentation/hspk/dto/hspk_pagination_result.dto';
import { CreateBulkHspkResultDto } from '../../presentation/hspk/dto/create_bulk_hspk_result.dto';
import { ValidateExcelFileUseCase } from './use_cases/validate_excel_file.use_case';
import { ValidateExcelHeadersUseCase } from './use_cases/validate_excel_headers.use_case';
import { ParseExcelDataUseCase } from './use_cases/parse_excel_data.use_case';
import { GenerateExcelTemplateUseCase } from './use_cases/generate_excel_template.use_case';

@Injectable()
export class HspkServiceImpl implements HspkService {
    constructor(
        private readonly hspkRepository: HspkRepository,
        private readonly validateExcelFileUseCase: ValidateExcelFileUseCase,
        private readonly validateExcelHeadersUseCase: ValidateExcelHeadersUseCase,
        private readonly parseExcelDataUseCase: ParseExcelDataUseCase,
        private readonly generateExcelTemplateUseCase: GenerateExcelTemplateUseCase,
    ) {}

    async create(dto: CreateHspkDto): Promise<Hspk> {
        const existing = await this.hspkRepository.findByNoMataPembayaranAndTahun(
            dto.no_mata_pembayaran,
            dto.tahun_anggaran,
        );
        if (existing) {
            throw new ConflictException(
                `Hspk with no_mata_pembayaran ${dto.no_mata_pembayaran} and tahun_anggaran ${dto.tahun_anggaran} already exists`,
            );
        }
        return await this.hspkRepository.create(dto);
    }

    async update(dto: UpdateHspkDto): Promise<Hspk> {
        const existing = await this.hspkRepository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`Hspk with id ${dto.id} not found`);
        }

        const targetNo = dto.no_mata_pembayaran ?? existing.no_mata_pembayaran;
        const targetTahun = dto.tahun_anggaran ?? existing.tahun_anggaran;

        if (targetNo !== existing.no_mata_pembayaran || targetTahun !== existing.tahun_anggaran) {
            const duplicate = await this.hspkRepository.findByNoMataPembayaranAndTahun(
                targetNo,
                targetTahun,
            );
            if (duplicate && duplicate.id !== dto.id) {
                throw new ConflictException(
                    `Hspk with no_mata_pembayaran ${targetNo} and tahun_anggaran ${targetTahun} already exists`,
                );
            }
        }

        return await this.hspkRepository.update(dto);
    }

    async delete(id: number): Promise<boolean> {
        const existing = await this.hspkRepository.findById(id);
        if (!existing) {
            throw new NotFoundException(`Hspk with id ${id} not found`);
        }
        return await this.hspkRepository.delete(id);
    }

    async findById(id: number): Promise<Hspk | null> {
        return await this.hspkRepository.findById(id);
    }

    async findAll(dto: GetHspkDto): Promise<HspkPaginationResultDto> {
        const result = await this.hspkRepository.findAll(dto);
        return {
            data: result.data,
            total: result.total,
            page: dto.page ?? 1,
            limit: dto.amount ?? result.total,
            totalPages: dto.amount ? Math.ceil(result.total / dto.amount) : 1,
        };
    }

    async findByNoMataPembayaranAndTahun(
        no_mata_pembayaran: string,
        tahun_anggaran: number,
    ): Promise<Hspk | null> {
        return await this.hspkRepository.findByNoMataPembayaranAndTahun(
            no_mata_pembayaran,
            tahun_anggaran,
        );
    }

    async findByRuangLingkup(id_ruang_lingkup: number, tahun_anggaran?: number): Promise<Hspk[]> {
        return await this.hspkRepository.findByRuangLingkup(id_ruang_lingkup, tahun_anggaran);
    }

    async createBulk(file: Express.Multer.File): Promise<CreateBulkHspkResultDto> {
        this.validateExcelFileUseCase.execute(file);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file.buffer as any);
        this.validateExcelHeadersUseCase.execute(workbook);

        const rows = await this.parseExcelDataUseCase.execute(file);

        const conflictingKeys: string[] = [];
        for (const row of rows) {
            const existing = await this.hspkRepository.findByNoMataPembayaranAndTahun(
                row.no_mata_pembayaran,
                row.tahun_anggaran,
            );
            if (existing) {
                conflictingKeys.push(
                    `no_mata_pembayaran "${row.no_mata_pembayaran}" (tahun_anggaran ${row.tahun_anggaran})`,
                );
            }
        }
        if (conflictingKeys.length > 0) {
            throw new ConflictException(
                `HSPK already exists: ${[...new Set(conflictingKeys)].join('; ')}`,
            );
        }

        const created = await this.hspkRepository.bulkCreate(rows);
        const result = new CreateBulkHspkResultDto();
        result.created = created.length;
        result.data = created;
        return result;
    }

    async downloadTemplate(): Promise<{ buffer: Buffer; filename: string }> {
        const buffer = await this.generateExcelTemplateUseCase.execute();
        const filename = `HSPK_Template_${new Date().getFullYear()}.xlsx`;
        return { buffer, filename };
    }
}
