import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { KecamatanService } from '../../domain/kecamatan/kecamatan.service';
import { KecamatanRepository } from '../../domain/kecamatan/kecamatan.repository';
import { Kecamatan } from '../../domain/kecamatan/kecamatan.entity';
import { CreateKecamatanDto } from '../../presentation/kecamatan/dto/create_kecamatan.dto';
import { UpdateKecamatanDto } from '../../presentation/kecamatan/dto/update_kecamatan.dto';
import { DeleteKecamatanDto } from '../../presentation/kecamatan/dto/delete_kecamatan.dto';
import { GetKecamatansDto } from '../../presentation/kecamatan/dto/get_kecamatans.dto';
import { GetKecamatanDetailDto } from '../../presentation/kecamatan/dto/get_kecamatan_detail.dto';
import { KabKotaRepository } from '../../domain/kabkota/kabkota.repository';

@Injectable()
export class KecamatanServiceImpl implements KecamatanService {
    constructor(
        private readonly repository: KecamatanRepository,
        private readonly kabkotaRepository: KabKotaRepository,
    ) { }

    async create(dto: CreateKecamatanDto): Promise<Kecamatan> {
        // Validate that kabkota exists
        const kabkota = await this.kabkotaRepository.findById(dto.idKabkota);
        if (!kabkota) {
            throw new BadRequestException(`KabKota with id ${dto.idKabkota} not found`);
        }

        const kecamatan = await this.repository.create(dto);
        return kecamatan;
    }

    async update(dto: UpdateKecamatanDto): Promise<Kecamatan> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`Kecamatan with id ${dto.id} not found`);
        }

        // Validate kabkota if it's being updated
        if (dto.idKabkota) {
            const kabkota = await this.kabkotaRepository.findById(dto.idKabkota);
            if (!kabkota) {
                throw new BadRequestException(`KabKota with id ${dto.idKabkota} not found`);
            }
        }

        const { id, ...updateData } = dto;
        const updated = await this.repository.update(id, updateData);
        return updated;
    }

    async delete(dto: DeleteKecamatanDto): Promise<void> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`Kecamatan with id ${dto.id} not found`);
        }

        await this.repository.delete(dto.id);
    }

    async getById(dto: GetKecamatanDetailDto): Promise<Kecamatan> {
        const kecamatan = await this.repository.findById(dto.id);
        if (!kecamatan) {
            throw new NotFoundException(`Kecamatan with id ${dto.id} not found`);
        }
        return kecamatan;
    }

    async getAll(dto: GetKecamatansDto): Promise<{ data: Kecamatan[]; total: number; page: number; amount: number; totalPages: number }> {
        const filter: any = {};
        if (dto.idKabkota) filter.idKabkota = dto.idKabkota;
        if (dto.search) filter.search = dto.search;

        const { data, total } = await this.repository.findAll(dto.page, dto.amount, filter);

        return {
            data,
            total,
            page: dto.page ?? 1,
            amount: dto.amount ?? total,
            totalPages: dto.amount ? Math.ceil(total / dto.amount) : 1,
        };
    }

    async getKecamatanByKabkotaId(idKabkota: number): Promise<Kecamatan[]> {
        const kecamatans = await this.repository.findByKabkotaId(idKabkota);
        return kecamatans;
    }
}
