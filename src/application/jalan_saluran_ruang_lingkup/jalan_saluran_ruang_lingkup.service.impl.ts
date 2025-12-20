import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanSaluranRuangLingkupService } from "../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.service";
import { JalanSaluranRuangLingkupRepository } from "../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.repository";
import { CreateJalanSaluranRuangLingkupDto } from "../../presentation/jalan_saluran_ruang_lingkup/dto/create_jalan_saluran_ruang_lingkup.dto";
import { JalanSaluranRuangLingkup } from "../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.entity";
import { UpdateJalanSaluranRuangLingkupDto } from "../../presentation/jalan_saluran_ruang_lingkup/dto/update_jalan_saluran_ruang_lingkup.dto";
import { GetJalanSaluranRuangLingkupDto } from "../../presentation/jalan_saluran_ruang_lingkup/dto/get_jalan_saluran_ruang_lingkup.dto";
import { JalanSaluranRuangLingkupPaginationResultDto } from "../../presentation/jalan_saluran_ruang_lingkup/dto/jalan_saluran_ruang_lingkup_pagination_result.dto";

@Injectable()
export class JalanSaluranRuangLingkupServiceImpl implements JalanSaluranRuangLingkupService {
    constructor(
        private readonly repository: JalanSaluranRuangLingkupRepository
    ) { }

    async create(dto: CreateJalanSaluranRuangLingkupDto): Promise<JalanSaluranRuangLingkup> {
        try {
            const existing = await this.repository.findByJenisUsulanAndDivisi(dto.id_jenis_usulan, dto.nomor_divisi);
            if (existing) {
                throw new ConflictException(`JalanSaluranRuangLingkup with jenisUsulan ${dto.id_jenis_usulan} and nomorDivisi ${dto.nomor_divisi} already exists`);
            }
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSaluranRuangLingkupDto): Promise<JalanSaluranRuangLingkup> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanSaluranRuangLingkup with ID ${dto.id} not found`);
            }

            const targetJenisUsulan = dto.id_jenis_usulan ?? existing.id_jenis_usulan;
            const targetNomorDivisi = dto.nomor_divisi ?? existing.nomor_divisi;

            if (targetJenisUsulan !== existing.id_jenis_usulan || targetNomorDivisi !== existing.nomor_divisi) {
                const duplicate = await this.repository.findByJenisUsulanAndDivisi(targetJenisUsulan, targetNomorDivisi);
                if (duplicate) {
                    throw new ConflictException(`JalanSaluranRuangLingkup with jenisUsulan ${targetJenisUsulan} and nomorDivisi ${targetNomorDivisi} already exists`);
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
                throw new NotFoundException(`JalanSaluranRuangLingkup with ID ${id} not found`);
            }
            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanSaluranRuangLingkup | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSaluranRuangLingkupDto): Promise<JalanSaluranRuangLingkupPaginationResultDto> {
        try {
            const result = await this.repository.findAll(dto);
            return {
                data: result.data,
                total: result.total,
                page: dto.page ?? 1,
                amount: dto.amount ?? result.total,
                totalPages: dto.amount ? Math.ceil(result.total / dto.amount) : 1
            };
        } catch (error) {
            throw error;
        }
    }

    async findByJenisUsulanAndDivisi(idJenisUsulan: number, nomorDivisi: number): Promise<JalanSaluranRuangLingkup | null> {
        try {
            return await this.repository.findByJenisUsulanAndDivisi(idJenisUsulan, nomorDivisi);
        } catch (error) {
            throw error;
        }
    }
}
