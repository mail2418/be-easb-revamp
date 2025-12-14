import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanSpesifikasiDesainKaku } from "../../domain/jalan_spesifikasi_desain_kaku/jalan_spesifikasi_desain_kaku.entity";
import { JalanSpesifikasiDesainKakuRepository } from "../../domain/jalan_spesifikasi_desain_kaku/jalan_spesifikasi_desain_kaku.repository";
import { JalanSpesifikasiDesainKakuService } from "../../domain/jalan_spesifikasi_desain_kaku/jalan_spesifikasi_desain_kaku.service";
import { CreateJalanSpesifikasiDesainKakuDto } from "../../presentation/jalan_spesifikasi_desain_kaku/dto/create_jalan_spesifikasi_desain_kaku.dto";
import { GetJalanSpesifikasiDesainKakuDto } from "../../presentation/jalan_spesifikasi_desain_kaku/dto/get_jalan_spesifikasi_desain_kaku.dto";
import { JalanSpesifikasiDesainKakuPaginationResultDto } from "../../presentation/jalan_spesifikasi_desain_kaku/dto/jalan_spesifikasi_desain_kaku_pagination_result.dto";
import { UpdateJalanSpesifikasiDesainKakuDto } from "../../presentation/jalan_spesifikasi_desain_kaku/dto/update_jalan_spesifikasi_desain_kaku.dto";

@Injectable()
export class JalanSpesifikasiDesainKakuServiceImpl implements JalanSpesifikasiDesainKakuService {
    constructor(private readonly repository: JalanSpesifikasiDesainKakuRepository) {}

    async create(dto: CreateJalanSpesifikasiDesainKakuDto): Promise<JalanSpesifikasiDesainKaku> {
        try {
            const existing = await this.repository.findBySpec(dto.spec);
            if (existing) {
                throw new ConflictException(`JalanSpesifikasiDesainKaku with spec ${dto.spec} already exists`);
            }

            const newEntity = await this.repository.create(dto);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSpesifikasiDesainKakuDto): Promise<JalanSpesifikasiDesainKaku> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanSpesifikasiDesainKaku with id ${dto.id} not found`);
            }
    
            if (dto.spec && dto.spec !== existing.spec) {
                const duplicate = await this.repository.findBySpec(dto.spec);
                if (duplicate) {
                    throw new ConflictException(`JalanSpesifikasiDesainKaku with spec ${dto.spec} already exists`);
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
                throw new NotFoundException(`JalanSpesifikasiDesainKaku with id ${id} not found`);
            }

            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanSpesifikasiDesainKaku | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSpesifikasiDesainKakuDto): Promise<JalanSpesifikasiDesainKakuPaginationResultDto> {
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

    async findBySpec(spec: string): Promise<JalanSpesifikasiDesainKaku | null> {
        try {
            return await this.repository.findBySpec(spec);
        } catch (error) {
            throw error;
        }
    }
}