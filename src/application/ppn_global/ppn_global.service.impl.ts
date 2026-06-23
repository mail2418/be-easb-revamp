import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PpnGlobalService } from '../../domain/ppn_global/ppn_global.service';
import { PpnGlobalRepository } from '../../domain/ppn_global/ppn_global.repository';
import { CreatePpnGlobalDto } from '../../presentation/ppn_global/dto/create_ppn_global.dto';
import { PpnGlobal } from '../../domain/ppn_global/ppn_global.entity';
import { UpdatePpnGlobalDto } from '../../presentation/ppn_global/dto/update_ppn_global.dto';
import { GetPpnGlobalDto } from '../../presentation/ppn_global/dto/get_ppn_global.dto';
import { PpnGlobalPaginationResultDto } from '../../presentation/ppn_global/dto/ppn_global_pagination_result.dto';

@Injectable()
export class PpnGlobalServiceImpl implements PpnGlobalService {
    constructor(private readonly repository: PpnGlobalRepository) {}

    async create(dto: CreatePpnGlobalDto): Promise<PpnGlobal> {
        const existing = await this.repository.findByBulanAndTahun(dto.bulan, dto.tahun);
        if (existing) {
            throw new ConflictException(
                `PpnGlobal with bulan ${dto.bulan} and tahun ${dto.tahun} already exists`,
            );
        }
        return await this.repository.create(dto);
    }

    async update(dto: UpdatePpnGlobalDto): Promise<PpnGlobal> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`PpnGlobal with ID ${dto.id} not found`);
        }

        if (
            (dto.bulan && dto.bulan !== existing.bulan) ||
            (dto.tahun && dto.tahun !== existing.tahun)
        ) {
            const targetBulan = dto.bulan ?? existing.bulan;
            const targetTahun = dto.tahun ?? existing.tahun;
            const duplicate = await this.repository.findByBulanAndTahun(targetBulan, targetTahun);
            if (duplicate) {
                throw new ConflictException(
                    `PpnGlobal with bulan ${targetBulan} and tahun ${targetTahun} already exists`,
                );
            }
        }
        return await this.repository.update(dto);
    }

    async delete(id: number): Promise<boolean> {
        const exists = await this.repository.findById(id);
        if (!exists) {
            throw new NotFoundException(`PpnGlobal with ID ${id} not found`);
        }
        return await this.repository.delete(id);
    }

    async findById(id: number): Promise<PpnGlobal | null> {
        return await this.repository.findById(id);
    }

    async findAll(dto: GetPpnGlobalDto): Promise<PpnGlobalPaginationResultDto> {
        const { data, total } = await this.repository.findAll(dto);
        const page = dto.page ?? 1;
        const amount = dto.amount ?? total;
        const totalPages = amount > 0 ? Math.ceil(total / amount) : 1;

        return {
            data,
            total,
            page: dto.page ?? 1,
            limit: dto.amount ?? total,
            totalPages: dto.amount ? Math.ceil(total / dto.amount) : 1,
        };
    }

    async findByBulanAndTahun(bulan: number, tahun: number): Promise<PpnGlobal | null> {
        return await this.repository.findByBulanAndTahun(bulan, tahun);
    }

    async getLatestPersentasePPn(): Promise<number | null> {
        const latest = await this.repository.getLatest();
        return latest?.persentase_ppn || null;
    }
}
