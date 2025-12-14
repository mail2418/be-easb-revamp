import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanMutuBeton } from "../../domain/jalan_mutu_beton/jalan_mutu_beton.entity";
import { JalanMutuBetonRepository } from "../../domain/jalan_mutu_beton/jalan_mutu_beton.repository";
import { JalanMutuBetonService } from "../../domain/jalan_mutu_beton/jalan_mutu_beton.service";
import { CreateJalanMutuBetonDto } from "../../presentation/jalan_mutu_beton/dto/create_jalan_mutu_beton.dto";
import { GetJalanMutuBetonDto } from "../../presentation/jalan_mutu_beton/dto/get_jalan_mutu_beton.dto";
import { JalanMutuBetonPaginationResultDto } from "../../presentation/jalan_mutu_beton/dto/jalan_mutu_beton_pagination_result.dto";
import { UpdateJalanMutuBetonDto } from "../../presentation/jalan_mutu_beton/dto/update_jalan_mutu_beton.dto";

@Injectable()
export class JalanMutuBetonServiceImpl implements JalanMutuBetonService {
    constructor(private readonly repository: JalanMutuBetonRepository) {}

    async create(dto: CreateJalanMutuBetonDto): Promise<JalanMutuBeton> {
        try {
            const existing = await this.repository.findByJenis(dto.jenis);
            if (existing) {
                throw new ConflictException(`JalanMutuBeton with jenis ${dto.jenis} already exists`);
            }

            const newEntity = await this.repository.create(dto);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanMutuBetonDto): Promise<JalanMutuBeton> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanMutuBeton with id ${dto.id} not found`);
            }
    
            if (dto.jenis && dto.jenis !== existing.jenis) {
                const duplicate = await this.repository.findByJenis(dto.jenis);
                if (duplicate) {
                    throw new ConflictException(`JalanMutuBeton with jenis ${dto.jenis} already exists`);
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
                throw new NotFoundException(`JalanMutuBeton with id ${id} not found`);
            }

            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanMutuBeton | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanMutuBetonDto): Promise<JalanMutuBetonPaginationResultDto> {
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

    async findByJenis(jenis: string): Promise<JalanMutuBeton | null> {
        try {
            return await this.repository.findByJenis(jenis);    
        } catch (error) {
            throw error;
        }
    }
}