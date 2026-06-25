import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RencanaTahunAnggaranService } from '../../domain/rencana_tahun_anggaran/rencana_tahun_anggaran.service';
import { RencanaTahunAnggaranRepository } from '../../domain/rencana_tahun_anggaran/rencana_tahun_anggaran.repository';
import { RencanaTahunAnggaran } from '../../domain/rencana_tahun_anggaran/rencana_tahun_anggaran.entity';
import { CreateRencanaTahunAnggaranDto } from '../../presentation/rencana_tahun_anggaran/dto/create_rencana_tahun_anggaran.dto';
import { UpdateRencanaTahunAnggaranDto } from '../../presentation/rencana_tahun_anggaran/dto/update_rencana_tahun_anggaran.dto';
import { DeleteRencanaTahunAnggaranDto } from '../../presentation/rencana_tahun_anggaran/dto/delete_rencana_tahun_anggaran.dto';
import { GetRencanaTahunAnggaransDto } from '../../presentation/rencana_tahun_anggaran/dto/get_rencana_tahun_anggarans.dto';
import { GetRencanaTahunAnggaranDetailDto } from '../../presentation/rencana_tahun_anggaran/dto/get_rencana_tahun_anggaran_detail.dto';
import { RencanaTahunAnggaransPaginationResult } from '../../presentation/rencana_tahun_anggaran/dto/rencana_tahun_anggarans_pagination_result.dto';

@Injectable()
export class RencanaTahunAnggaranServiceImpl implements RencanaTahunAnggaranService {
    constructor(private readonly repository: RencanaTahunAnggaranRepository) {}

    async create(dto: CreateRencanaTahunAnggaranDto): Promise<RencanaTahunAnggaran> {
        const existing = await this.repository.findByTahun(dto.tahun);
        if (existing) {
            throw new ConflictException(`Tahun anggaran ${dto.tahun} sudah ada`);
        }
        return await this.repository.create(dto);
    }

    async updateRencanaTahunAnggaran(dto: UpdateRencanaTahunAnggaranDto): Promise<RencanaTahunAnggaran> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`Rencana tahun anggaran dengan id ${dto.id} tidak ditemukan`);
        }

        if (dto.tahun !== undefined && dto.tahun !== existing.tahun) {
            const conflict = await this.repository.findByTahun(dto.tahun);
            if (conflict) {
                throw new ConflictException(`Tahun anggaran ${dto.tahun} sudah ada`);
            }
        }

        const updateData: Partial<RencanaTahunAnggaran> = {
            tahun: dto.tahun,
            isActive: dto.isActive,
        };

        Object.keys(updateData).forEach((key) => {
            if (updateData[key as keyof typeof updateData] === undefined) {
                delete updateData[key as keyof typeof updateData];
            }
        });

        return await this.repository.update(dto.id, updateData);
    }

    async deleteRencanaTahunAnggaran(dto: DeleteRencanaTahunAnggaranDto): Promise<boolean> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`Rencana tahun anggaran dengan id ${dto.id} tidak ditemukan`);
        }
        return await this.repository.delete(dto.id);
    }

    async getRencanaTahunAnggarans(
        pagination: GetRencanaTahunAnggaransDto,
    ): Promise<RencanaTahunAnggaransPaginationResult> {
        const page = pagination.page ?? 1;
        const amount = pagination.amount ?? 10;
        const result = await this.repository.findAll({
            ...pagination,
            page,
            amount,
        });
        return {
            rencanaTahunAnggarans: result.data,
            total: result.total,
            page,
            amount,
            totalPages: Math.ceil(result.total / amount),
        };
    }

    async getRencanaTahunAnggaranDetail(
        dto: GetRencanaTahunAnggaranDetailDto,
    ): Promise<RencanaTahunAnggaran> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`Rencana tahun anggaran dengan id ${dto.id} tidak ditemukan`);
        }
        return existing;
    }
}
