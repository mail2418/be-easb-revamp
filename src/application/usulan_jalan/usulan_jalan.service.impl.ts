import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsulanJalanService } from '../../domain/usulan_jalan/usulan_jalan.service';
import { UsulanJalanRepository } from '../../domain/usulan_jalan/usulan_jalan.repository';
import { CreateUsulanJalanDto } from './dto/create_usulan_jalan.dto';
import { UsulanJalanStatus } from '../../domain/usulan_jalan/usulan_jalan_status.enum';
import { UsulanJalan } from 'src/domain/usulan_jalan/usulan_jalan.entity';
import { UpdateUsulanJalanDto } from './dto/update_usulan_jalan.dto';

@Injectable()
export class UsulanJalanServiceImpl extends UsulanJalanService {
    constructor(private readonly repo: UsulanJalanRepository) {
        super();
    }

    async create(dto: CreateUsulanJalanDto): Promise<UsulanJalan> {
        return this.repo.create({
            ...dto,
            status: UsulanJalanStatus.PENDING,
        });
    }

    async findById(id: number): Promise<UsulanJalan> {
        const found = await this.repo.findById(id);
        if (!found) {
            throw new NotFoundException(`Usulan jalan dengan id ${id} tidak ditemukan`);
        }
        return found;
    }

    async findAll(page: number, amount: number): Promise<{ data: UsulanJalan[]; total: number; page: number; amount: number; totalPages: number }> {
        const p = page && page > 0 ? page : 1;
        const a = amount && amount > 0 ? amount : 10;

        const result = await this.repo.findAll(p, a);
        const totalPages = Math.ceil(result.total / a);

        return {
            data: result.data,
            total: result.total,
            page: p,
            amount: a,
            totalPages,
        };
    }

    async update(id: number, dto: Partial<UpdateUsulanJalanDto>): Promise<UsulanJalan> {
        const existing = await this.repo.findById(id);
        if (!existing) {
            throw new NotFoundException(`Usulan jalan dengan id ${id} tidak ditemukan`);
        }

        if (existing.status !== UsulanJalanStatus.PENDING) {
            throw new BadRequestException(`Tidak dapat mengubah usulan yang berstatus '${existing.status}'. Hanya usulan dengan status 'pending' dapat disunting.`);
        }

        const payload: Partial<UsulanJalan> = {};
        if (dto.jenisUsulan !== undefined) payload.jenisUsulan = dto.jenisUsulan;
        if (dto.lebarJalan !== undefined) payload.lebarJalan = dto.lebarJalan;
        if (dto.strukturPerkerasan !== undefined) payload.strukturPerkerasan = dto.strukturPerkerasan;
        if (dto.sumbuKumulatif !== undefined) payload.sumbuKumulatif = dto.sumbuKumulatif;
        if (dto.nilaiCbr !== undefined) payload.nilaiCbr = dto.nilaiCbr;

        const updated = await this.repo.update(id, payload);
        return updated;
    }

    async delete(id: number): Promise<boolean> {
        const existing = await this.repo.findById(id);
        if (!existing) {
            throw new NotFoundException(`Usulan jalan dengan id ${id} tidak ditemukan`);
        }

        if (existing.status !== UsulanJalanStatus.PENDING) {
            throw new BadRequestException(`Tidak dapat menghapus usulan yang berstatus '${existing.status}'. Hanya usulan dengan status 'pending' dapat dihapus.`);
        }

        const deleted = await this.repo.delete(id);
        return deleted;
    }
}
