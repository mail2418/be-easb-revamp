import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanSmkkService } from "../../domain/jalan_smkk/jalan_smkk.service";
import { JalanSmkkRepository } from "../../domain/jalan_smkk/jalan_smkk.repository";
import { CreateJalanSmkkDto } from "../../presentation/jalan_smkk/dto/create_jalan_smkk.dto";
import { JalanSmkk } from "../../domain/jalan_smkk/jalan_smkk.entity";
import { UpdateJalanSmkkDto } from "../../presentation/jalan_smkk/dto/update_jalan_smkk.dto";
import { GetJalanSmkkDto } from "../../presentation/jalan_smkk/dto/get_jalan_smkk.dto";
import { JalanSmkkPaginationResultDto } from "../../presentation/jalan_smkk/dto/jalan_smkk_pagination_result.dto";

@Injectable()
export class JalanSmkkServiceImpl implements JalanSmkkService {
    constructor(private readonly repository: JalanSmkkRepository) { }

    async create(dto: CreateJalanSmkkDto): Promise<JalanSmkk> {
        try {
            const existing = await this.repository.findByBulanAndTahun(dto.bulan, dto.tahun);
            if (existing) {
                throw new ConflictException(`JalanSmkk with bulan ${dto.bulan} and tahun ${dto.tahun} already exists`);
            }
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSmkkDto): Promise<JalanSmkk> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanSmkk with ID ${dto.id} not found`);
            }

            if ((dto.bulan && dto.bulan !== existing.bulan) || (dto.tahun && dto.tahun !== existing.tahun)) {
                const targetBulan = dto.bulan ?? existing.bulan;
                const targetTahun = dto.tahun ?? existing.tahun;
                const duplicate = await this.repository.findByBulanAndTahun(targetBulan, targetTahun);
                if (duplicate) {
                    throw new ConflictException(`JalanSmkk with bulan ${targetBulan} and tahun ${targetTahun} already exists`);
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
                throw new NotFoundException(`JalanSmkk with ID ${id} not found`);
            }
            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanSmkk | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSmkkDto): Promise<JalanSmkkPaginationResultDto> {
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

    async findByBulanAndTahun(bulan: number, tahun: number): Promise<JalanSmkk | null> {
        try {
            return await this.repository.findByBulanAndTahun(bulan, tahun);
        } catch (error) {
            throw error;
        }
    }
}
