import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { HspkService } from '../../domain/hspk/hspk.service';
import { HspkRepository } from '../../domain/hspk/hspk.repository';
import { Hspk } from '../../domain/hspk/hspk.entity';
import { CreateHspkDto } from '../../presentation/hspk/dto/create_hspk.dto';
import { UpdateHspkDto } from '../../presentation/hspk/dto/update_hspk.dto';
import { GetHspkDto } from '../../presentation/hspk/dto/get_hspk.dto';
import { HspkPaginationResultDto } from '../../presentation/hspk/dto/hspk_pagination_result.dto';

@Injectable()
export class HspkServiceImpl implements HspkService {
    constructor(
        private readonly hspkRepository: HspkRepository
    ) {}

    async create(dto: CreateHspkDto): Promise<Hspk> {
        try {
            const existing = await this.hspkRepository.findByNoMataPembayaran(dto.no_mata_pembayaran);
            if (existing) {
                throw new ConflictException(`Hspk with no_mata_pembayaran ${dto.no_mata_pembayaran} already exists`);
            }
            return await this.hspkRepository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateHspkDto): Promise<Hspk> {
        try {
            const existing = await this.hspkRepository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`Hspk with id ${dto.id} not found`);
            }

            if (dto.no_mata_pembayaran && dto.no_mata_pembayaran !== existing.no_mata_pembayaran) {
                const duplicate = await this.hspkRepository.findByNoMataPembayaran(dto.no_mata_pembayaran);
                if (duplicate) {
                    throw new ConflictException(`Hspk with no_mata_pembayaran ${dto.no_mata_pembayaran} already exists`);
                }
            }

            return await this.hspkRepository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existing = await this.hspkRepository.findById(id);
            if (!existing) {
                throw new NotFoundException(`Hspk with id ${id} not found`);
            }
            return await this.hspkRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Hspk | null> {
        try {
            return await this.hspkRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetHspkDto): Promise<HspkPaginationResultDto> {
        try {
            const result = await this.hspkRepository.findAll(dto);
            return {
                data: result.data,
                total: result.total,
                page: dto.page ?? 1,
                limit: dto.amount ?? result.total,
                totalPages: dto.amount ? Math.ceil(result.total / dto.amount) : 1
            };
        } catch (error) {
            throw error;
        }
    }

    async findByNoMataPembayaran(no_mata_pembayaran: string): Promise<Hspk | null> {
        try {
            return await this.hspkRepository.findByNoMataPembayaran(no_mata_pembayaran);
        } catch (error) {
            throw error;
        }
    }

    async findByRuangLingkup(id_ruang_lingkup: number): Promise<Hspk[]> {
        try {
            return await this.hspkRepository.findByRuangLingkup(id_ruang_lingkup);
        } catch (error) {
            throw error;
        }
    }
}

