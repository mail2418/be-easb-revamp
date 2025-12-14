import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanRuangLingkupPerkerasanLentur } from "../../domain/jalan_ruang_lingkup_perkerasan_lentur/jalan_ruang_lingkup_perkerasan_lentur.entity";
import { JalanRuangLingkupPerkerasanLenturRepository } from "../../domain/jalan_ruang_lingkup_perkerasan_lentur/jalan_ruang_lingkup_perkerasan_lentur.repository";
import { JalanRuangLingkupPerkerasanLenturService } from "../../domain/jalan_ruang_lingkup_perkerasan_lentur/jalan_ruang_lingkup_perkerasan_lentur.service";
import { CreateJalanRuangLingkupPerkerasanLenturDto } from "../../presentation/jalan_ruang_lingkup_perkerasan_lentur/dto/create_jalan_ruang_lingkup_perkerasan_lentur.dto";
import { GetJalanRuangLingkupPerkerasanLenturDto } from "../../presentation/jalan_ruang_lingkup_perkerasan_lentur/dto/get_jalan_ruang_lingkup_perkerasan_lentur.dto";
import { JalanRuangLingkupPerkerasanLenturPaginationResultDto } from "../../presentation/jalan_ruang_lingkup_perkerasan_lentur/dto/jalan_ruang_lingkup_perkerasan_lentur_pagination_result.dto";
import { UpdateJalanRuangLingkupPerkerasanLenturDto } from "../../presentation/jalan_ruang_lingkup_perkerasan_lentur/dto/update_jalan_ruang_lingkup_perkerasan_lentur.dto";

@Injectable()
export class JalanRuangLingkupPerkerasanLenturServiceImpl implements JalanRuangLingkupPerkerasanLenturService {
    constructor(private readonly repository: JalanRuangLingkupPerkerasanLenturRepository) {}

    async create(dto: CreateJalanRuangLingkupPerkerasanLenturDto): Promise<JalanRuangLingkupPerkerasanLentur> {
        try {
            const existing = await this.repository.findByJenis(dto.jenis);
            if (existing) {
                throw new ConflictException(`JalanRuangLingkupPerkerasanLentur with jenis ${dto.jenis} already exists`);
            }

            const newEntity = await this.repository.create(dto);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanRuangLingkupPerkerasanLenturDto): Promise<JalanRuangLingkupPerkerasanLentur> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanRuangLingkupPerkerasanLentur with id ${dto.id} not found`);
            }
    
            if (dto.jenis && dto.jenis !== existing.jenis) {
                const duplicate = await this.repository.findByJenis(dto.jenis);
                if (duplicate) {
                    throw new ConflictException(`JalanRuangLingkupPerkerasanLentur with jenis ${dto.jenis} already exists`);
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
                throw new NotFoundException(`JalanRuangLingkupPerkerasanLentur with id ${id} not found`);
            }

            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanRuangLingkupPerkerasanLentur | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanRuangLingkupPerkerasanLenturDto): Promise<JalanRuangLingkupPerkerasanLenturPaginationResultDto> {
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

    async findByJenis(jenis: string): Promise<JalanRuangLingkupPerkerasanLentur | null> {
        try {
            return await this.repository.findByJenis(jenis);    
        } catch (error) {
            throw error;
        }
    }
}