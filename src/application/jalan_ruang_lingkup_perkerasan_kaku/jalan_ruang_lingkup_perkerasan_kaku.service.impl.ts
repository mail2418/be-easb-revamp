import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanRuangLingkupPerkerasanKaku } from "../../domain/jalan_ruang_lingkup_perkerasan_kaku/jalan_ruang_lingkup_perkerasan_kaku.entity";
import { JalanRuangLingkupPerkerasanKakuRepository } from "../../domain/jalan_ruang_lingkup_perkerasan_kaku/jalan_ruang_lingkup_perkerasan_kaku.repository";
import { JalanRuangLingkupPerkerasanKakuService } from "../../domain/jalan_ruang_lingkup_perkerasan_kaku/jalan_ruang_lingkup_perkerasan_kaku.service";
import { CreateJalanRuangLingkupPerkerasanKakuDto } from "../../presentation/jalan_ruang_lingkup_perkerasan_kaku/dto/create_jalan_ruang_lingkup_perkerasan_kaku.dto";
import { GetJalanRuangLingkupPerkerasanKakuDto } from "../../presentation/jalan_ruang_lingkup_perkerasan_kaku/dto/get_jalan_ruang_lingkup_perkerasan_kaku.dto";
import { JalanRuangLingkupPerkerasanKakuPaginationResultDto } from "../../presentation/jalan_ruang_lingkup_perkerasan_kaku/dto/jalan_ruang_lingkup_perkerasan_kaku_pagination_result.dto";
import { UpdateJalanRuangLingkupPerkerasanKakuDto } from "../../presentation/jalan_ruang_lingkup_perkerasan_kaku/dto/update_jalan_ruang_lingkup_perkerasan_kaku.dto";

@Injectable()
export class JalanRuangLingkupPerkerasanKakuServiceImpl implements JalanRuangLingkupPerkerasanKakuService {
    constructor(private readonly repository: JalanRuangLingkupPerkerasanKakuRepository) {}

    async create(dto: CreateJalanRuangLingkupPerkerasanKakuDto): Promise<JalanRuangLingkupPerkerasanKaku> {
        try {
            const existing = await this.repository.findByJenis(dto.jenis);
            if (existing) {
                throw new ConflictException(`JalanRuangLingkupPerkerasanKaku with jenis ${dto.jenis} already exists`);
            }

            const newEntity = await this.repository.create(dto);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanRuangLingkupPerkerasanKakuDto): Promise<JalanRuangLingkupPerkerasanKaku> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanRuangLingkupPerkerasanKaku with id ${dto.id} not found`);
            }
    
            if (dto.jenis && dto.jenis !== existing.jenis) {
                const duplicate = await this.repository.findByJenis(dto.jenis);
                if (duplicate) {
                    throw new ConflictException(`JalanRuangLingkupPerkerasanKaku with jenis ${dto.jenis} already exists`);
                }
            }
    
            const updatedEntity = await this.repository.update(dto);
            return updatedEntity;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new NotFoundException(`JalanRuangLingkupPerkerasanKaku with id ${id} not found`);
            }

            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanRuangLingkupPerkerasanKaku | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanRuangLingkupPerkerasanKakuDto): Promise<JalanRuangLingkupPerkerasanKakuPaginationResultDto> {
        try {
            const result = await this.repository.findAll(dto);
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

    async findByJenis(jenis: string): Promise<JalanRuangLingkupPerkerasanKaku | null> {
        try {
            return await this.repository.findByJenis(jenis);    
        } catch (error) {
            throw error;
        }
    }
}