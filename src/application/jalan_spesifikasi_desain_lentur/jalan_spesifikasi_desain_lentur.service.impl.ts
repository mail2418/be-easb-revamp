import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanSpesifikasiDesainLentur } from "../../domain/jalan_spesifikasi_desain_lentur/jalan_spesifikasi_desain_lentur.entity";
import { JalanSpesifikasiDesainLenturRepository } from "../../domain/jalan_spesifikasi_desain_lentur/jalan_spesifikasi_desain_lentur.repository";
import { JalanSpesifikasiDesainLenturService } from "../../domain/jalan_spesifikasi_desain_lentur/jalan_spesifikasi_desain_lentur.service";
import { CreateJalanSpesifikasiDesainLenturDto } from "../../presentation/jalan_spesifikasi_desain_lentur/dto/create_jalan_spesifikasi_desain_lentur.dto";
import { GetJalanSpesifikasiDesainLenturDto } from "../../presentation/jalan_spesifikasi_desain_lentur/dto/get_jalan_spesifikasi_desain_lentur.dto";
import { JalanSpesifikasiDesainLenturPaginationResultDto } from "../../presentation/jalan_spesifikasi_desain_lentur/dto/jalan_spesifikasi_desain_lentur_pagination_result.dto";
import { UpdateJalanSpesifikasiDesainLenturDto } from "../../presentation/jalan_spesifikasi_desain_lentur/dto/update_jalan_spesifikasi_desain_lentur.dto";

@Injectable()
export class JalanSpesifikasiDesainLenturServiceImpl implements JalanSpesifikasiDesainLenturService {
    constructor(private readonly repository: JalanSpesifikasiDesainLenturRepository) {}

    async create(dto: CreateJalanSpesifikasiDesainLenturDto): Promise<JalanSpesifikasiDesainLentur> {
        try {
            const existing = await this.repository.findBySpec(dto.spec);
            if (existing) {
                throw new ConflictException(`JalanSpesifikasiDesainLentur with spec ${dto.spec} already exists`);
            }

            const newEntity = await this.repository.create(dto);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSpesifikasiDesainLenturDto): Promise<JalanSpesifikasiDesainLentur> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanSpesifikasiDesainLentur with id ${dto.id} not found`);
            }
    
            if (dto.spec && dto.spec !== existing.spec) {
                const duplicate = await this.repository.findBySpec(dto.spec);
                if (duplicate) {
                    throw new ConflictException(`JalanSpesifikasiDesainLentur with spec ${dto.spec} already exists`);
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
                throw new NotFoundException(`JalanSpesifikasiDesainLentur with id ${id} not found`);
            }

            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanSpesifikasiDesainLentur | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSpesifikasiDesainLenturDto): Promise<JalanSpesifikasiDesainLenturPaginationResultDto> {
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

    async findBySpec(spec: string): Promise<JalanSpesifikasiDesainLentur | null> {
        try {
            return await this.repository.findBySpec(spec);
        } catch (error) {
            throw error;
        }
    }
}