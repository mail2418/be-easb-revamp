import { Injectable, NotFoundException } from "@nestjs/common";
import { JalanSpesifikasiDesainReviewService } from "../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.service";
import { JalanSpesifikasiDesainReviewRepository } from "../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.repository";
import { CreateJalanSpesifikasiDesainReviewDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/create_jalan_spesifikasi_desain_review.dto";
import { UpdateJalanSpesifikasiDesainReviewDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/update_jalan_spesifikasi_desain_review.dto";
import { GetJalanSpesifikasiDesainReviewDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/get_jalan_spesifikasi_desain_review.dto";
import { JalanSpesifikasiDesainReview } from "../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.entity";
import { JalanSpesifikasiDesainReviewPaginationResultDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/jalan_spesifikasi_desain_review_pagination_result.dto";
import { CalculateVolumeJalanSpesifikasiDesainReviewUseCase } from "./use_cases/calculate_volume_jalan_spesifikasi_desain_review.use_case";
import { HspkService } from "../../domain/hspk/hspk.service";
import { UsulanJalanRepository } from "../../domain/usulan_jalan/usulan_jalan.repository";
import { GetJalanSpesifikasiDesainReviewByUsulanJalanDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/get_jalan_spesifikasi_desain_review_by_usulan_jalan.dto";

@Injectable()
export class JalanSpesifikasiDesainReviewServiceImpl implements JalanSpesifikasiDesainReviewService {
    constructor(
        private readonly repository: JalanSpesifikasiDesainReviewRepository,
        private readonly calculateVolumeReviewUseCase: CalculateVolumeJalanSpesifikasiDesainReviewUseCase,
        private readonly hspkService: HspkService,
        private readonly usulanJalanRepository: UsulanJalanRepository,
    ) { }

    async create(dto: CreateJalanSpesifikasiDesainReviewDto, lebar?: number): Promise<JalanSpesifikasiDesainReview> {
        try {
            // Get lebar from usulan_jalan if not provided
            let lebarValue = lebar;
            if (lebarValue === undefined) {
                const usulanJalan = await this.usulanJalanRepository.findById(dto.id_usulan_jalan);
                if (!usulanJalan) {
                    throw new NotFoundException(`Usulan Jalan with id ${dto.id_usulan_jalan} not found`);
                }
                if (!usulanJalan.lebar) {
                    throw new NotFoundException(`Usulan Jalan with id ${dto.id_usulan_jalan} has no lebar`);
                }
                lebarValue = usulanJalan.lebar;
            }

            // Get HSPK to get harga_satuan
            const hspk = await this.hspkService.findById(dto.id_hspk);
            if (!hspk) {
                throw new NotFoundException(`HSPK with id ${dto.id_hspk} not found`);
            }

            if (!hspk.harga_satuan) {
                throw new NotFoundException(`HSPK with id ${dto.id_hspk} has no harga_satuan`);
            }

            // Calculate volume_review based on satuan from HSPK
            const volume_review = await this.calculateVolumeReviewUseCase.execute(
                dto.id_hspk,
                lebarValue,
                dto.tinggi_review,
                dto.spasi_review,
            );

            // Calculate harga_spec_review = harga_satuan * volume_review
            const harga_spec_review = hspk.harga_satuan * volume_review;

            // Add calculated fields to DTO
            const dtoWithCalculations = {
                ...dto,
                volume_review,
                harga_spec_review,
            };

            return await this.repository.create(dtoWithCalculations);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSpesifikasiDesainReviewDto): Promise<JalanSpesifikasiDesainReview> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanSpesifikasiDesainReview with ID ${dto.id} not found`);
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
                throw new NotFoundException(`JalanSpesifikasiDesainReview with ID ${id} not found`);
            }
            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanSpesifikasiDesainReview | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSpesifikasiDesainReviewDto): Promise<JalanSpesifikasiDesainReviewPaginationResultDto> {
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

    async deleteByUsulanJalanId(idUsulanJalan: number): Promise<void> {
        try {
            await this.repository.deleteByUsulanJalanId(idUsulanJalan);
        } catch (error) {
            throw error;
        }
    }

    async getByUsulanJalan(dto: GetJalanSpesifikasiDesainReviewByUsulanJalanDto): Promise<{ data: JalanSpesifikasiDesainReview[]; total: number; page: number; amount: number; totalPages: number }> {
        try {
            const [data, total] = await this.repository.findByUsulanJalan(dto.idUsulanJalan, dto.page, dto.amount);
            
            // If pagination is not provided, return all data with page=1, amount=total
            const page = dto.page ?? 1;
            const amount = dto.amount ?? total;
            
            return {
                data,
                total,
                page,
                amount,
                totalPages: amount > 0 ? Math.ceil(total / amount) : 1
            };
        } catch (error) {
            throw error;
        }
    }
}
