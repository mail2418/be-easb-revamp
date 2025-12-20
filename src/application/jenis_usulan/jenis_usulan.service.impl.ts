import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JenisUsulanService } from "../../domain/jenis_usulan/jenis_usulan.service";
import { JenisUsulanRepository } from "../../domain/jenis_usulan/jenis_usulan.repository";
import { CreateJenisUsulanDto } from "../../presentation/jenis_usulan/dto/create_jenis_usulan.dto";
import { JenisUsulan } from "../../domain/jenis_usulan/jenis_usulan.entity";
import { UpdateJenisUsulanDto } from "../../presentation/jenis_usulan/dto/update_jenis_usulan.dto";
import { GetJenisUsulanDto } from "../../presentation/jenis_usulan/dto/get_jenis_usulan.dto";
import { JenisUsulanPaginationResultDto } from "../../presentation/jenis_usulan/dto/jenis_usulan_pagination_result.dto";

@Injectable()
export class JenisUsulanServiceImpl implements JenisUsulanService {
    constructor(private readonly repository: JenisUsulanRepository) { }

    async create(dto: CreateJenisUsulanDto): Promise<JenisUsulan> {
        try {
            const existing = await this.repository.findByJenis(dto.jenis);
            if (existing) {
                throw new ConflictException(`JenisUsulan with jenis ${dto.jenis} already exists`);
            }
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJenisUsulanDto): Promise<JenisUsulan> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JenisUsulan with ID ${dto.id} not found`);
            }

            if (dto.jenis && dto.jenis !== existing.jenis) {
                const duplicate = await this.repository.findByJenis(dto.jenis);
                if (duplicate) {
                    throw new ConflictException(`JenisUsulan with jenis ${dto.jenis} already exists`);
                }
            }
            return await this.repository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const exists = await this.repository.findById(id);
            if (!exists) {
                throw new NotFoundException(`JenisUsulan with ID ${id} not found`);
            }
            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JenisUsulan | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJenisUsulanDto): Promise<JenisUsulanPaginationResultDto> {
        try {
            const { data, total } = await this.repository.findAll(dto);
            const page = dto.page ?? 1;
            const amount = dto.amount ?? total;
            const totalPages = amount > 0 ? Math.ceil(total / amount) : 1;

            return {
                data,
                total,
                page: dto.page ?? 1,
                limit: dto.amount ?? total,
                totalPages: dto.amount ? Math.ceil(total / dto.amount) : 1
            };
        } catch (error) {
            throw error;
        }
    }

    async findByJenis(jenis: string): Promise<JenisUsulan | null> {
        try {
            return await this.repository.findByJenis(jenis);
        } catch (error) {
            throw error;
        }
    }
}
