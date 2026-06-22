import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { Express } from 'express';
import { HspkService } from '../../domain/hspk/hspk.service';
import { HspkRepository } from '../../domain/hspk/hspk.repository';
import { GetHspksDto } from '../../presentation/hspk/dto/get_hspks.dto';
import { CreateHspkDto } from '../../presentation/hspk/dto/create_hspk.dto';
import { UpdateHspkDto } from '../../presentation/hspk/dto/update_hspk.dto';
import { DeleteHspkDto } from '../../presentation/hspk/dto/delete_hspk.dto';
import { GetHspkDetailDto } from '../../presentation/hspk/dto/get_hspk_detail.dto';
import { GetHspkByRuangLingkupDto } from '../../presentation/hspk/dto/get_hspk_by_ruang_lingkup.dto';
import { BulkHspkDto } from '../../presentation/hspk/dto/bulk_hspk.dto';
import { buildHspkTemplateBuffer, parseHspkBulkFile } from '../../common/utils/excel_template.util';

@Injectable()
export class HspkServiceImpl implements HspkService {
    constructor(private readonly repository: HspkRepository) {}

    async create(dto: CreateHspkDto, tahunAnggaran = new Date().getFullYear()) {
        return this.repository.create(dto, tahunAnggaran);
    }

    async update(dto: UpdateHspkDto) {
        if (!(await this.repository.findById(dto.id))) {
            throw new NotFoundException(`HSPK with id ${dto.id} not found`);
        }
        return this.repository.update(dto);
    }

    async delete(dto: DeleteHspkDto) {
        if (!(await this.repository.findById(dto.id))) {
            throw new NotFoundException(`HSPK with id ${dto.id} not found`);
        }
        return this.repository.delete(dto.id);
    }

    async findAll(dto: GetHspksDto) {
        const result = await this.repository.findAll(dto);
        return {
            ...result,
            page: dto.page,
            amount: dto.amount,
            totalPages: Math.ceil(result.total / dto.amount) || 1,
        };
    }

    async findById(dto: GetHspkDetailDto) {
        const item = await this.repository.findById(dto.id);
        if (!item) throw new NotFoundException(`HSPK with id ${dto.id} not found`);
        return item;
    }

    async findByRuangLingkup(dto: GetHspkByRuangLingkupDto) {
        return this.repository.findByRuangLingkup(dto.id_ruang_lingkup);
    }

    async bulkImport(dto: BulkHspkDto, file: Express.Multer.File) {
        if (!file) throw new BadRequestException('file is required');
        const rows = await parseHspkBulkFile(file);
        if (!rows.length) throw new BadRequestException('No valid rows found in file');
        const imported = await this.repository.bulkCreate(
            rows.map((row) => ({ ...row, tahun_anggaran: dto.tahun_anggaran })),
        );
        return { imported };
    }

    async generateTemplate() {
        return buildHspkTemplateBuffer();
    }
}
