import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanJenisUsulanService } from "../../domain/jalan_jenis_usulan/jalan_jenis_usulan.service";
import { JalanJenisUsulanRepository } from "../../domain/jalan_jenis_usulan/jalan_jenis_usulan.repository";
import { CreateJalanJenisUsulanDto } from "../../presentation/jalan_jenis_usulan/dto/create_jalan_jenis_usulan.dto";
import { UpdateJalanJenisUsulanDto } from "../../presentation/jalan_jenis_usulan/dto/update_jalan_jenis_usulan.dto";
import { GetJalanJenisUsulanDto } from "../../presentation/jalan_jenis_usulan/dto/get_jalan_jenis_usulan.dto";
import { JalanJenisUsulan } from "../../domain/jalan_jenis_usulan/jalan_jenis_usulan.entity";
import { JalanJenisUsulanPaginationResultDto } from "../../presentation/jalan_jenis_usulan/dto/jalan_jenis_usulan_pagination_result.dto";

@Injectable()
export class JalanJenisUsulanServiceImpl implements JalanJenisUsulanService {
    constructor(
        private readonly jalanJenisUsulanRepository: JalanJenisUsulanRepository
    ) { }

    async create(dto: CreateJalanJenisUsulanDto): Promise<JalanJenisUsulan> {
        try {
            const existing = await this.jalanJenisUsulanRepository.findByJenisUsulan(dto.jenis_usulan);
            if (existing) {
                throw new ConflictException(`JalanJenisUsulan with jenis_usulan ${dto.jenis_usulan} already exists`);
            }
            return await this.jalanJenisUsulanRepository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanJenisUsulanDto): Promise<JalanJenisUsulan> {
        try {
            const existing = await this.jalanJenisUsulanRepository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanJenisUsulan with id ${dto.id} not found`);
            }

            if (dto.jenis_usulan && dto.jenis_usulan !== existing.jenis_usulan) {
                const duplicate = await this.jalanJenisUsulanRepository.findByJenisUsulan(dto.jenis_usulan);
                if (duplicate) {
                    throw new ConflictException(`JalanJenisUsulan with jenis_usulan ${dto.jenis_usulan} already exists`);
                }
            }
            return await this.jalanJenisUsulanRepository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existing = await this.jalanJenisUsulanRepository.findById(id);
            if (!existing) {
                throw new NotFoundException(`JalanJenisUsulan with id ${id} not found`);
            }
            return await this.jalanJenisUsulanRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanJenisUsulan | null> {
        try {
            return await this.jalanJenisUsulanRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanJenisUsulanDto): Promise<JalanJenisUsulanPaginationResultDto> {
        try {
            const result = await this.jalanJenisUsulanRepository.findAll(dto);
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

    async findByJenisUsulan(jenisUsulan: string): Promise<JalanJenisUsulan | null> {
        try {
            return await this.jalanJenisUsulanRepository.findByJenisUsulan(jenisUsulan);
        } catch (error) {
            throw error;
        }
    }
}
