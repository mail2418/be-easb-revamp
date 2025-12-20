import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanKebijakanService } from "../../domain/jalan_kebijakan/jalan_kebijakan.service";
import { JalanKebijakanRepository } from "../../domain/jalan_kebijakan/jalan_kebijakan.repository";
import { CreateJalanKebijakanDto } from "../../presentation/jalan_kebijakan/dto/create_jalan_kebijakan.dto";
import { JalanKebijakan } from "../../domain/jalan_kebijakan/jalan_kebijakan.entity";
import { UpdateJalanKebijakanDto } from "../../presentation/jalan_kebijakan/dto/update_jalan_kebijakan.dto";
import { GetJalanKebijakanDto } from "../../presentation/jalan_kebijakan/dto/get_jalan_kebijakan.dto";
import { JalanKebijakanPaginationResultDto } from "../../presentation/jalan_kebijakan/dto/jalan_kebijakan_pagination_result.dto";

@Injectable()
export class JalanKebijakanServiceImpl implements JalanKebijakanService {
    constructor(private readonly repository: JalanKebijakanRepository) { }

    async create(dto: CreateJalanKebijakanDto): Promise<JalanKebijakan> {
        try {
            const existing = await this.repository.findByKabkotaBulanTahun(dto.idKabkota, dto.bulan, dto.tahun);
            if (existing) {
                throw new ConflictException(`JalanKebijakan with kabkota ${dto.idKabkota}, bulan ${dto.bulan}, tahun ${dto.tahun} already exists`);
            }
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanKebijakanDto): Promise<JalanKebijakan> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanKebijakan with ID ${dto.id} not found`);
            }

            const targetKabkota = dto.idKabkota ?? existing.idKabkota;
            const targetBulan = dto.bulan ?? existing.bulan;
            const targetTahun = dto.tahun ?? existing.tahun;

            if (targetKabkota !== existing.idKabkota || targetBulan !== existing.bulan || targetTahun !== existing.tahun) {
                const duplicate = await this.repository.findByKabkotaBulanTahun(targetKabkota, targetBulan, targetTahun);
                if (duplicate) {
                    throw new ConflictException(`JalanKebijakan with kabkota ${targetKabkota}, bulan ${targetBulan}, tahun ${targetTahun} already exists`);
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
                throw new NotFoundException(`JalanKebijakan with ID ${id} not found`);
            }
            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanKebijakan | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanKebijakanDto): Promise<JalanKebijakanPaginationResultDto> {
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

    async findByKabkotaBulanTahun(idKabkota: number, bulan: number, tahun: number): Promise<JalanKebijakan | null> {
        try {
            return await this.repository.findByKabkotaBulanTahun(idKabkota, bulan, tahun);
        } catch (error) {
            throw error;
        }
    }
}
