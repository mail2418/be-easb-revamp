import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { SmkkGlobalService } from "../../domain/smkk_global/smkk_global.service";
import { SmkkGlobalRepository } from "../../domain/smkk_global/smkk_global.repository";
import { CreateSmkkGlobalDto } from "../../presentation/smkk_global/dto/create_smkk_global.dto";
import { SmkkGlobal } from "../../domain/smkk_global/smkk_global.entity";
import { UpdateSmkkGlobalDto } from "../../presentation/smkk_global/dto/update_smkk_global.dto";
import { GetSmkkGlobalDto } from "../../presentation/smkk_global/dto/get_smkk_global.dto";
import { SmkkGlobalPaginationResultDto } from "../../presentation/smkk_global/dto/smkk_global_pagination_result.dto";

@Injectable()
export class SmkkGlobalServiceImpl implements SmkkGlobalService {
    constructor(private readonly repository: SmkkGlobalRepository) { }

    async create(dto: CreateSmkkGlobalDto): Promise<SmkkGlobal> {
        try {
            const existing = await this.repository.findByBulanAndTahun(dto.bulan, dto.tahun);
            if (existing) {
                throw new ConflictException(`SmkkGlobal with bulan ${dto.bulan} and tahun ${dto.tahun} already exists`);
            }
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateSmkkGlobalDto): Promise<SmkkGlobal> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`SmkkGlobal with ID ${dto.id} not found`);
            }

            if ((dto.bulan && dto.bulan !== existing.bulan) || (dto.tahun && dto.tahun !== existing.tahun)) {
                const targetBulan = dto.bulan ?? existing.bulan;
                const targetTahun = dto.tahun ?? existing.tahun;
                const duplicate = await this.repository.findByBulanAndTahun(targetBulan, targetTahun);
                if (duplicate) {
                    throw new ConflictException(`SmkkGlobal with bulan ${targetBulan} and tahun ${targetTahun} already exists`);
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
                throw new NotFoundException(`SmkkGlobal with ID ${id} not found`);
            }
            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<SmkkGlobal | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetSmkkGlobalDto): Promise<SmkkGlobalPaginationResultDto> {
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

    async findByBulanAndTahun(bulan: number, tahun: number): Promise<SmkkGlobal | null> {
        try {
            return await this.repository.findByBulanAndTahun(bulan, tahun);
        } catch (error) {
            throw error;
        }
    }

    async getLatestPersentaseSmkk(): Promise<number | null> {
        try {
            const latest = await this.repository.getLatest();
            return latest?.persentase_smkk || null;
        } catch (error) {
            throw error;
        }
    }
}

