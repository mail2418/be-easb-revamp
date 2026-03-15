import { Injectable } from '@nestjs/common';
import { SaluranSpesifikasiSmkkReviewService } from '../../domain/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.service';
import { JalanSaluranSpesifikasiSmkkReviewRepository } from '../../domain/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.repository';
import { GetSaluranSpesifikasiSmkkReviewByUsulanSaluranDto } from '../../presentation/saluran_spesifikasi_smkk_review/dto/get_saluran_spesifikasi_smkk_review_by_usulan_saluran.dto';
import { SaluranSpesifikasiSmkkReview } from '../../domain/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.entity';
import { CreateSaluranSpesifikasiSmkkReviewDto } from '../../presentation/saluran_spesifikasi_smkk_review/dto/create_saluran_spesifikasi_smkk_review.dto';
import { CreateJalanSaluranSpesifikasiSmkkReviewDto } from '../../presentation/jalan_saluran_spesifikasi_smkk_review/dto/create_jalan_saluran_spesifikasi_smkk_review.dto';

@Injectable()
export class SaluranSpesifikasiSmkkReviewServiceImpl implements SaluranSpesifikasiSmkkReviewService {
    constructor(
        private readonly repository: JalanSaluranSpesifikasiSmkkReviewRepository,
    ) { }

    async create(dto: CreateSaluranSpesifikasiSmkkReviewDto): Promise<SaluranSpesifikasiSmkkReview> {
        const createDto: CreateJalanSaluranSpesifikasiSmkkReviewDto = {
            id_jenis_usulan: dto.id_jenis_usulan,
            id_usulan: dto.id_usulan,
            id_jalan_saluran_smkk: dto.id_jalan_saluran_smkk,
            harga_spec: dto.harga_spec,
            jumlah_barang: dto.jumlah_barang,
            harga_satuan: dto.harga_satuan,
        };
        return await this.repository.create(createDto) as unknown as SaluranSpesifikasiSmkkReview;
    }

    async deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void> {
        await this.repository.deleteByUsulanSaluranId(idUsulanSaluran);
    }

    async getByUsulanSaluran(dto: GetSaluranSpesifikasiSmkkReviewByUsulanSaluranDto): Promise<{ data: SaluranSpesifikasiSmkkReview[]; total: number; page: number; amount: number; totalPages: number }> {
        const [data, total] = await this.repository.findByUsulanSaluran(dto.idUsulanSaluran, dto.page, dto.amount);
        const page = dto.page ?? 1;
        const amount = dto.amount ?? total;
        return {
            data: data as unknown as SaluranSpesifikasiSmkkReview[],
            total,
            page,
            amount,
            totalPages: amount > 0 ? Math.ceil(total / amount) : 1
        };
    }
}
