import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanTipePerkerasanKakuService } from "../../domain/jalan_tipe_perkerasan_kaku/jalan_tipe_perkerasan_kaku.service";
import { JalanTipePerkerasanKakuRepository } from "../../domain/jalan_tipe_perkerasan_kaku/jalan_tipe_perkerasan_kaku.repository";
import { CreateJalanTipePerkerasanKakuDto } from "../../presentation/jalan_tipe_perkerasan_kaku/dto/create_jalan_tipe_perkerasan_kaku.dto";
import { UpdateJalanTipePerkerasanKakuDto } from "../../presentation/jalan_tipe_perkerasan_kaku/dto/update_jalan_tipe_perkerasan_kaku.dto";
import { GetJalanTipePerkerasanKakuDto } from "../../presentation/jalan_tipe_perkerasan_kaku/dto/get_jalan_tipe_perkerasan_kaku.dto";
import { JalanTipePerkerasanKaku } from "../../domain/jalan_tipe_perkerasan_kaku/jalan_tipe_perkerasan_kaku.entity";
import { JalanTipePerkerasanKakuPaginationResultDto } from "../../presentation/jalan_tipe_perkerasan_kaku/dto/jalan_tipe_perkerasan_kaku_pagination_result.dto";

@Injectable()
export class JalanTipePerkerasanKakuServiceImpl implements JalanTipePerkerasanKakuService {
    constructor(
        private readonly jalanTipePerkerasanKakuRepository: JalanTipePerkerasanKakuRepository
    ) { }

    async create(dto: CreateJalanTipePerkerasanKakuDto): Promise<JalanTipePerkerasanKaku> {
        try {
            const existing = await this.jalanTipePerkerasanKakuRepository.findByTipe(dto.tipe);
            if (existing) {
                throw new ConflictException(`JalanTipePerkerasanKaku with tipe ${dto.tipe} already exists`);
            }
            return await this.jalanTipePerkerasanKakuRepository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanTipePerkerasanKakuDto): Promise<JalanTipePerkerasanKaku> {
        try {
            const existing = await this.jalanTipePerkerasanKakuRepository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanTipePerkerasanKaku with id ${dto.id} not found`);
            }

            if (dto.tipe && dto.tipe !== existing.tipe) {
                const duplicate = await this.jalanTipePerkerasanKakuRepository.findByTipe(dto.tipe);
                if (duplicate) {
                    throw new ConflictException(`JalanTipePerkerasanKaku with tipe ${dto.tipe} already exists`);
                }
            }
            return await this.jalanTipePerkerasanKakuRepository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existing = await this.jalanTipePerkerasanKakuRepository.findById(id);
            if (!existing) {
                throw new NotFoundException(`JalanTipePerkerasanKaku with id ${id} not found`);
            }
            return await this.jalanTipePerkerasanKakuRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanTipePerkerasanKaku | null> {
        try {
            return await this.jalanTipePerkerasanKakuRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanTipePerkerasanKakuDto): Promise<JalanTipePerkerasanKakuPaginationResultDto> {
        try {
            const result = await this.jalanTipePerkerasanKakuRepository.findAll(dto);
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

    async findByTipe(tipe: string): Promise<JalanTipePerkerasanKaku | null> {
        try {
            return await this.jalanTipePerkerasanKakuRepository.findByTipe(tipe);
        } catch (error) {
            throw error;
        }
    }
}
