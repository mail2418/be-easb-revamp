import { Injectable, NotFoundException } from '@nestjs/common';
import { SaluranSpesifikasiDesainReviewService } from '../../domain/saluran_spesifikasi_desain_review/saluran_spesifikasi_desain_review.service';
import { SaluranSpesifikasiDesainReviewRepository } from '../../domain/saluran_spesifikasi_desain_review/saluran_spesifikasi_desain_review.repository';
import { CreateSaluranSpesifikasiDesainReviewDto } from '../../presentation/saluran_spesifikasi_desain_review/dto/create_saluran_spesifikasi_desain_review.dto';
import { UpdateSaluranSpesifikasiDesainReviewDto } from '../../presentation/saluran_spesifikasi_desain_review/dto/update_saluran_spesifikasi_desain_review.dto';
import { GetSaluranSpesifikasiDesainReviewDto } from '../../presentation/saluran_spesifikasi_desain_review/dto/get_saluran_spesifikasi_desain_review.dto';
import { SaluranSpesifikasiDesainReview } from '../../domain/saluran_spesifikasi_desain_review/saluran_spesifikasi_desain_review.entity';
import { SaluranSpesifikasiDesainReviewPaginationResultDto } from '../../presentation/saluran_spesifikasi_desain_review/dto/saluran_spesifikasi_desain_review_pagination_result.dto';
import { CalculateVolumeSaluranSpesifikasiDesainReviewUseCase } from './use_cases/calculate_volume_saluran_spesifikasi_desain_review.use_case';
import { HspkService } from '../../domain/hspk/hspk.service';
import { UsulanSaluranRepository } from '../../domain/usulan_saluran/usulan_saluran.repository';
import { GetSaluranSpesifikasiDesainReviewByUsulanSaluranDto } from '../../presentation/saluran_spesifikasi_desain_review/dto/get_saluran_spesifikasi_desain_review_by_usulan_saluran.dto';

@Injectable()
export class SaluranSpesifikasiDesainReviewServiceImpl
    implements SaluranSpesifikasiDesainReviewService
{
    constructor(
        private readonly repository: SaluranSpesifikasiDesainReviewRepository,
        private readonly calculateVolumeReviewUseCase: CalculateVolumeSaluranSpesifikasiDesainReviewUseCase,
        private readonly hspkService: HspkService,
        private readonly usulanSaluranRepository: UsulanSaluranRepository,
    ) {}

    async create(
        dto: CreateSaluranSpesifikasiDesainReviewDto,
        lebar?: number,
    ): Promise<SaluranSpesifikasiDesainReview> {
        let lebarValue = lebar;
        if (lebarValue === undefined) {
            const usulanSaluran = await this.usulanSaluranRepository.findById(
                dto.id_usulan_saluran,
            );
            if (!usulanSaluran) {
                throw new NotFoundException(
                    `Usulan Saluran with id ${dto.id_usulan_saluran} not found`,
                );
            }
            if (!usulanSaluran.lebar) {
                throw new NotFoundException(
                    `Usulan Saluran with id ${dto.id_usulan_saluran} has no lebar`,
                );
            }
            lebarValue = usulanSaluran.lebar;
        }

        const hspk = await this.hspkService.findById(dto.id_hspk);
        if (!hspk) {
            throw new NotFoundException(`HSPK with id ${dto.id_hspk} not found`);
        }

        if (!hspk.harga_satuan) {
            throw new NotFoundException(`HSPK with id ${dto.id_hspk} has no harga_satuan`);
        }

        const volume_review = await this.calculateVolumeReviewUseCase.execute(
            dto.id_hspk,
            lebarValue,
            dto.tinggi_review,
            dto.spasi_review,
        );

        const harga_spec_review = hspk.harga_satuan * volume_review;

        const dtoWithCalculations = {
            ...dto,
            volume_review,
            harga_spec_review,
        };

        return await this.repository.create(dtoWithCalculations);
    }

    async update(
        dto: UpdateSaluranSpesifikasiDesainReviewDto,
    ): Promise<SaluranSpesifikasiDesainReview> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(
                `SaluranSpesifikasiDesainReview with id ${dto.id} not found`,
            );
        }
        return await this.repository.update(dto);
    }

    async delete(id: number): Promise<boolean> {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new NotFoundException(`SaluranSpesifikasiDesainReview with id ${id} not found`);
        }
        return await this.repository.delete(id);
    }

    async findById(id: number): Promise<SaluranSpesifikasiDesainReview | null> {
        return await this.repository.findById(id);
    }

    async findAll(
        dto: GetSaluranSpesifikasiDesainReviewDto,
    ): Promise<SaluranSpesifikasiDesainReviewPaginationResultDto> {
        const result = await this.repository.findAll(dto);
        return {
            data: result.data,
            total: result.total,
            page: dto.page ?? 1,
            limit: dto.amount ?? result.total,
            totalPages: dto.amount ? Math.ceil(result.total / dto.amount) : 1,
        };
    }

    async deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void> {
        await this.repository.deleteByUsulanSaluranId(idUsulanSaluran);
    }

    async getByUsulanSaluran(dto: GetSaluranSpesifikasiDesainReviewByUsulanSaluranDto): Promise<{
        data: SaluranSpesifikasiDesainReview[];
        total: number;
        page: number;
        amount: number;
        totalPages: number;
    }> {
        const [data, total] = await this.repository.findByUsulanSaluran(
            dto.idUsulanSaluran,
            dto.page,
            dto.amount,
        );
        const page = dto.page ?? 1;
        const amount = dto.amount ?? total;
        return {
            data,
            total,
            page,
            amount,
            totalPages: amount > 0 ? Math.ceil(total / amount) : 1,
        };
    }
}
