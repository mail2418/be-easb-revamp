import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanRuangLingkupService } from "../../domain/jalan_ruang_lingkup/jalan_ruang_lingkup.service";
import { JalanRuangLingkupRepository } from "../../domain/jalan_ruang_lingkup/jalan_ruang_lingkup.repository";
import { CreateJalanRuangLingkupDto } from "../../presentation/jalan_ruang_lingkup/dto/create_jalan_ruang_lingkup.dto";
import { UpdateJalanRuangLingkupDto } from "../../presentation/jalan_ruang_lingkup/dto/update_jalan_ruang_lingkup.dto";
import { GetJalanRuangLingkupDto } from "../../presentation/jalan_ruang_lingkup/dto/get_jalan_ruang_lingkup.dto";
import { JalanRuangLingkup } from "../../domain/jalan_ruang_lingkup/jalan_ruang_lingkup.entity";
import { JalanRuangLingkupPaginationResultDto } from "../../presentation/jalan_ruang_lingkup/dto/jalan_ruang_lingkup_pagination_result.dto";

@Injectable()
export class JalanRuangLingkupServiceImpl implements JalanRuangLingkupService {
    constructor(
        private readonly jalanRuangLingkupRepository: JalanRuangLingkupRepository
    ) { }

    async create(dto: CreateJalanRuangLingkupDto): Promise<JalanRuangLingkup> {
        try {
            const existing = await this.jalanRuangLingkupRepository.findByRuangLingkup(dto.ruang_lingkup);
            if (existing) {
                throw new ConflictException(`JalanRuangLingkup with ruang_lingkup ${dto.ruang_lingkup} already exists`);
            }
            return await this.jalanRuangLingkupRepository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanRuangLingkupDto): Promise<JalanRuangLingkup> {
        try {
            const existing = await this.jalanRuangLingkupRepository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanRuangLingkup with id ${dto.id} not found`);
            }

            if (dto.ruang_lingkup && dto.ruang_lingkup !== existing.ruang_lingkup) {
                const duplicate = await this.jalanRuangLingkupRepository.findByRuangLingkup(dto.ruang_lingkup);
                if (duplicate) {
                    throw new ConflictException(`JalanRuangLingkup with ruang_lingkup ${dto.ruang_lingkup} already exists`);
                }
            }
            return await this.jalanRuangLingkupRepository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existing = await this.jalanRuangLingkupRepository.findById(id);
            if (!existing) {
                throw new NotFoundException(`JalanRuangLingkup with id ${id} not found`);
            }
            return await this.jalanRuangLingkupRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanRuangLingkup | null> {
        try {
            return await this.jalanRuangLingkupRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanRuangLingkupDto): Promise<JalanRuangLingkupPaginationResultDto> {
        try {
            const result = await this.jalanRuangLingkupRepository.findAll(dto);
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

    async findByRuangLingkup(ruangLingkup: string): Promise<JalanRuangLingkup | null> {
        try {
            return await this.jalanRuangLingkupRepository.findByRuangLingkup(ruangLingkup);
        } catch (error) {
            throw error;
        }
    }
}
