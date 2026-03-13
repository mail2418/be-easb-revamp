import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { KelurahanService } from '../../domain/kelurahan/kelurahan.service';
import { KelurahanRepository } from '../../domain/kelurahan/kelurahan.repository';
import { Kelurahan } from '../../domain/kelurahan/kelurahan.entity';
import { CreateKelurahanDto } from '../../presentation/kelurahan/dto/create_kelurahan.dto';
import { UpdateKelurahanDto } from '../../presentation/kelurahan/dto/update_kelurahan.dto';
import { DeleteKelurahanDto } from '../../presentation/kelurahan/dto/delete_kelurahan.dto';
import { GetKelurahansDto } from '../../presentation/kelurahan/dto/get_kelurahans.dto';
import { GetKelurahanDetailDto } from '../../presentation/kelurahan/dto/get_kelurahan_detail.dto';
import { KecamatanRepository } from '../../domain/kecamatan/kecamatan.repository';

@Injectable()
export class KelurahanServiceImpl implements KelurahanService {
    constructor(
        private readonly repository: KelurahanRepository,
        private readonly kecamatanRepository: KecamatanRepository,
    ) { }

    async create(dto: CreateKelurahanDto): Promise<Kelurahan> {
        try {
            // Validate that kecamatan exists
            const kecamatan = await this.kecamatanRepository.findById(dto.idKecamatan);
            if (!kecamatan) {
                throw new BadRequestException(`Kecamatan with id ${dto.idKecamatan} not found`);
            }

            const kelurahan = await this.repository.create(dto);
            return kelurahan;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateKelurahanDto): Promise<Kelurahan> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`Kelurahan with id ${dto.id} not found`);
            }

            // Validate kecamatan if it's being updated
            if (dto.idKecamatan) {
                const kecamatan = await this.kecamatanRepository.findById(dto.idKecamatan);
                if (!kecamatan) {
                    throw new BadRequestException(`Kecamatan with id ${dto.idKecamatan} not found`);
                }
            }

            const { id, ...updateData } = dto;
            const updated = await this.repository.update(id, updateData);
            return updated;
        } catch (error) {
            throw error;
        }
    }

    async delete(dto: DeleteKelurahanDto): Promise<void> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`Kelurahan with id ${dto.id} not found`);
            }

            await this.repository.delete(dto.id);
        } catch (error) {
            throw error;
        }
    }

    async getById(dto: GetKelurahanDetailDto): Promise<Kelurahan> {
        try {
            const kelurahan = await this.repository.findById(dto.id);
            if (!kelurahan) {
                throw new NotFoundException(`Kelurahan with id ${dto.id} not found`);
            }
            return kelurahan;
        } catch (error) {
            throw error;
        }
    }

    async getAll(dto: GetKelurahansDto): Promise<{ data: Kelurahan[]; total: number; page: number; amount: number; totalPages: number }> {
        try {
            const filter: any = {};
            if (dto.idKecamatan) filter.idKecamatan = dto.idKecamatan;
            if (dto.search) filter.search = dto.search;

            const { data, total } = await this.repository.findAll(dto.page, dto.amount, filter);

            return {
                data,
                total,
                page: dto.page,
                amount: dto.amount,
                totalPages: Math.ceil(total / dto.amount),
            };
        } catch (error) {
            throw error;
        }
    }

    async getKelurahanByKecamatanId(idKecamatan: number): Promise<{
        data: Kelurahan[];
        total: number;
        page: number;
        amount: number;
        totalPages: number;
    }> {
        try {
            const kelurahans = await this.repository.findByKecamatanId(idKecamatan);
            return {
                data: kelurahans,
                total: kelurahans.length,
                page: 1,
                amount: kelurahans.length,
                totalPages: 1,
            };
        } catch (error) {
            throw error;
        }
    }
}
