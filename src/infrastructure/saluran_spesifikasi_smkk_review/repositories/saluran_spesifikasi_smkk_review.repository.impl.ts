import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SaluranSpesifikasiSmkkReviewRepository } from "../../../domain/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.repository";
import { SaluranSpesifikasiSmkkReviewOrmEntity } from "../orm/saluran_spesifikasi_smkk_review.orm_entity";
import { SaluranSpesifikasiSmkkReview } from "../../../domain/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.entity";
import { CreateSaluranSpesifikasiSmkkReviewDto } from "../../../presentation/saluran_spesifikasi_smkk_review/dto/create_saluran_spesifikasi_smkk_review.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class SaluranSpesifikasiSmkkReviewRepositoryImpl implements SaluranSpesifikasiSmkkReviewRepository {
    constructor(@InjectRepository(SaluranSpesifikasiSmkkReviewOrmEntity) private readonly repo: Repository<SaluranSpesifikasiSmkkReviewOrmEntity>) { }

    async create(dto: CreateSaluranSpesifikasiSmkkReviewDto): Promise<SaluranSpesifikasiSmkkReview> {
        const ormEntity = plainToInstance(SaluranSpesifikasiSmkkReviewOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void> {
        await this.repo.softDelete({ id_usulan_saluran: idUsulanSaluran });
    }

    async findByUsulanSaluran(idUsulanSaluran: number, page?: number, amount?: number): Promise<[SaluranSpesifikasiSmkkReview[], number]> {
        const queryBuilder = this.repo
            .createQueryBuilder('sss_review')
            .select([
                'sss_review.id',
                'sss_review.id_jenis_usulan',
                'sss_review.id_usulan_saluran',
                'sss_review.id_jalan_saluran_smkk',
                'sss_review.harga_spec',
                'sss_review.jumlah_barang',
                'sss_review.harga_satuan'
            ])
            .where('sss_review.id_usulan_saluran = :idUsulanSaluran', { idUsulanSaluran })
            .orderBy('sss_review.id', 'DESC');

        if (page !== undefined && amount !== undefined) {
            const skip = (page - 1) * amount;
            queryBuilder.skip(skip).take(amount);
        }

        const [entities, total] = await queryBuilder.getManyAndCount();
        return [entities, total];
    }
}
