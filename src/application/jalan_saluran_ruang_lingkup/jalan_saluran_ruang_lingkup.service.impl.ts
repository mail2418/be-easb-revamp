import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JalanSaluranRuangLingkupService } from '../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.service';
import { JalanSaluranRuangLingkupRepository } from '../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.repository';
import { CreateJalanSaluranRuangLingkupDto } from '../../presentation/jalan_saluran_ruang_lingkup/dto/create_jalan_saluran_ruang_lingkup.dto';
import { JalanSaluranRuangLingkup } from '../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.entity';
import { UpdateJalanSaluranRuangLingkupDto } from '../../presentation/jalan_saluran_ruang_lingkup/dto/update_jalan_saluran_ruang_lingkup.dto';
import { GetJalanSaluranRuangLingkupDto } from '../../presentation/jalan_saluran_ruang_lingkup/dto/get_jalan_saluran_ruang_lingkup.dto';
import { JalanSaluranRuangLingkupPaginationResultDto } from '../../presentation/jalan_saluran_ruang_lingkup/dto/jalan_saluran_ruang_lingkup_pagination_result.dto';

@Injectable()
export class JalanSaluranRuangLingkupServiceImpl implements JalanSaluranRuangLingkupService {
    constructor(private readonly repository: JalanSaluranRuangLingkupRepository) {}

    async create(dto: CreateJalanSaluranRuangLingkupDto): Promise<JalanSaluranRuangLingkup> {
        const existing = await this.repository.findByJenisUsulanAndDeskripsi(
            dto.id_jenis_usulan,
            dto.deskripsi_ruang_lingkup,
        );
        if (existing) {
            throw new ConflictException(
                `JalanSaluranRuangLingkup with jenisUsulan ${dto.id_jenis_usulan} and deskripsi ${dto.deskripsi_ruang_lingkup} already exists`,
            );
        }
        return await this.repository.create(dto);
    }

    async update(dto: UpdateJalanSaluranRuangLingkupDto): Promise<JalanSaluranRuangLingkup> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`JalanSaluranRuangLingkup with ID ${dto.id} not found`);
        }

        const targetJenisUsulan = dto.id_jenis_usulan ?? existing.id_jenis_usulan;
        const targetDeskripsi = dto.deskripsi_ruang_lingkup ?? existing.deskripsi_ruang_lingkup;

        if (
            targetJenisUsulan !== existing.id_jenis_usulan ||
            targetDeskripsi !== existing.deskripsi_ruang_lingkup
        ) {
            const duplicate = await this.repository.findByJenisUsulanAndDeskripsi(
                targetJenisUsulan,
                targetDeskripsi,
            );
            if (duplicate) {
                throw new ConflictException(
                    `JalanSaluranRuangLingkup with jenisUsulan ${targetJenisUsulan} and deskripsi ${targetDeskripsi} already exists`,
                );
            }
        }
        return await this.repository.update(dto);
    }

    async delete(id: number): Promise<boolean> {
        const exists = await this.repository.findById(id);
        if (!exists) {
            throw new NotFoundException(`JalanSaluranRuangLingkup with ID ${id} not found`);
        }
        return await this.repository.delete(id);
    }

    async findById(id: number): Promise<JalanSaluranRuangLingkup | null> {
        return await this.repository.findById(id);
    }

    async findAll(
        dto: GetJalanSaluranRuangLingkupDto,
    ): Promise<JalanSaluranRuangLingkupPaginationResultDto> {
        const result = await this.repository.findAll(dto);
        return {
            data: result.data,
            total: result.total,
            page: dto.page ?? 1,
            limit: dto.amount ?? result.total,
            totalPages: dto.amount ? Math.ceil(result.total / dto.amount) : 1,
        };
    }

    async findByJenisUsulanAndDeskripsi(
        idJenisUsulan: number,
        deskripsi: string,
    ): Promise<JalanSaluranRuangLingkup | null> {
        return await this.repository.findByJenisUsulanAndDeskripsi(idJenisUsulan, deskripsi);
    }
}
