import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanTipePerkerasanLenturService } from "../../domain/jalan_tipe_perkerasan_lentur/jalan_tipe_perkerasan_lentur.service";
import { JalanTipePerkerasanLenturRepository } from "../../domain/jalan_tipe_perkerasan_lentur/jalan_tipe_perkerasan_lentur.repository";
import { CreateJalanTipePerkerasanLenturDto } from "../../presentation/jalan_tipe_perkerasan_lentur/dto/create_jalan_tipe_perkerasan_lentur.dto";
import { UpdateJalanTipePerkerasanLenturDto } from "../../presentation/jalan_tipe_perkerasan_lentur/dto/update_jalan_tipe_perkerasan_lentur.dto";
import { GetJalanTipePerkerasanLenturDto } from "../../presentation/jalan_tipe_perkerasan_lentur/dto/get_jalan_tipe_perkerasan_lentur.dto";
import { JalanTipePerkerasanLentur } from "../../domain/jalan_tipe_perkerasan_lentur/jalan_tipe_perkerasan_lentur.entity";
import { JalanTipePerkerasanLenturPaginationResultDto } from "../../presentation/jalan_tipe_perkerasan_lentur/dto/jalan_tipe_perkerasan_lentur_pagination_result.dto";

@Injectable()
export class JalanTipePerkerasanLenturServiceImpl implements JalanTipePerkerasanLenturService {
    constructor(
        private readonly jalanTipePerkerasanLenturRepository: JalanTipePerkerasanLenturRepository
    ) { }

    async create(dto: CreateJalanTipePerkerasanLenturDto): Promise<JalanTipePerkerasanLentur> {
        try {
            const existing = await this.jalanTipePerkerasanLenturRepository.findByTipe(dto.tipe);
            if (existing) {
                throw new ConflictException(`JalanTipePerkerasanLentur with tipe ${dto.tipe} already exists`);
            }
            return await this.jalanTipePerkerasanLenturRepository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanTipePerkerasanLenturDto): Promise<JalanTipePerkerasanLentur> {
        try {
            const existing = await this.jalanTipePerkerasanLenturRepository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanTipePerkerasanLentur with id ${dto.id} not found`);
            }

            if (dto.tipe && dto.tipe !== existing.tipe) {
                const duplicate = await this.jalanTipePerkerasanLenturRepository.findByTipe(dto.tipe);
                if (duplicate) {
                    throw new ConflictException(`JalanTipePerkerasanLentur with tipe ${dto.tipe} already exists`);
                }
            }
            return await this.jalanTipePerkerasanLenturRepository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existing = await this.jalanTipePerkerasanLenturRepository.findById(id);
            if (!existing) {
                throw new NotFoundException(`JalanTipePerkerasanLentur with id ${id} not found`);
            }
            return await this.jalanTipePerkerasanLenturRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanTipePerkerasanLentur | null> {
        try {
            return await this.jalanTipePerkerasanLenturRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanTipePerkerasanLenturDto): Promise<JalanTipePerkerasanLenturPaginationResultDto> {
        try {
            const result = await this.jalanTipePerkerasanLenturRepository.findAll(dto);
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

    async findByTipe(tipe: string): Promise<JalanTipePerkerasanLentur | null> {
        try {
            return await this.jalanTipePerkerasanLenturRepository.findByTipe(tipe);
        } catch (error) {
            throw error;
        }
    }
}
