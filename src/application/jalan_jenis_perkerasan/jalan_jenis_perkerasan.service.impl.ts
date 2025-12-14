import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanJenisPerkerasan } from "../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.entity";
import { JalanJenisPerkerasanRepository } from "../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.repository";
import { JalanJenisPerkerasanService } from "../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.service";
import { CreateJalanJenisPerkerasanDto } from "../../presentation/jalan_jenis_perkerasan/dto/create_jalan_jenis_perkerasan.dto";
import { GetJalanJenisPerkerasanDto } from "../../presentation/jalan_jenis_perkerasan/dto/get_jalan_jenis_perkerasan.dto";
import { JalanJenisPerkerasanPaginationResultDto } from "../../presentation/jalan_jenis_perkerasan/dto/jalan_jenis_perkerasan_pagination_result.dto";
import { UpdateJalanJenisPerkerasanDto } from "../../presentation/jalan_jenis_perkerasan/dto/update_jalan_jenis_perkerasan.dto";

@Injectable()
export class JalanJenisPerkerasanServiceImpl implements JalanJenisPerkerasanService {
    constructor(private readonly repository: JalanJenisPerkerasanRepository) {}

    async create(dto: CreateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan> {
        try {
            const existing = await this.repository.findByJenis(dto.jenis);
            if (existing) {
                throw new ConflictException(`JalanJenisPerkerasan with jenis ${dto.jenis} already exists`);
            }

            const newEntity = await this.repository.create(dto);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanJenisPerkerasan with id ${dto.id} not found`);
            }
    
            if (dto.jenis && dto.jenis !== existing.jenis) {
                const duplicate = await this.repository.findByJenis(dto.jenis);
                if (duplicate) {
                    throw new ConflictException(`JalanJenisPerkerasan with jenis ${dto.jenis} already exists`);
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
                throw new NotFoundException(`JalanJenisPerkerasan with id ${id} not found`);
            }

            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanJenisPerkerasan | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasanPaginationResultDto> {
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

    async findByJenis(jenis: string): Promise<JalanJenisPerkerasan | null> {
        try {
            return await this.repository.findByJenis(jenis);    
        } catch (error) {
            throw error;
        }
    }
}