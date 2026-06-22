import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanSaluranSpesifikasiSmkkReviewRepository } from "../../../domain/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.repository";
import { JalanSaluranSpesifikasiSmkkReviewOrmEntity } from "../orm/jalan_saluran_spesifikasi_smkk_review.orm_entity";
import { JalanSaluranSpesifikasiSmkkReview } from "../../../domain/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.entity";
import { CreateJalanSaluranSpesifikasiSmkkReviewDto } from "../../../presentation/jalan_saluran_spesifikasi_smkk_review/dto/create_jalan_saluran_spesifikasi_smkk_review.dto";
import { plainToInstance } from "class-transformer";
import { ID_JENIS_USULAN_JALAN, ID_JENIS_USULAN_SALURAN } from "../../../domain/jenis_usulan/jenis_usulan.constants";

@Injectable()
export class JalanSaluranSpesifikasiSmkkReviewRepositoryImpl implements JalanSaluranSpesifikasiSmkkReviewRepository {
    constructor(@InjectRepository(JalanSaluranSpesifikasiSmkkReviewOrmEntity) private readonly repo: Repository<JalanSaluranSpesifikasiSmkkReviewOrmEntity>) { }

    async create(dto: CreateJalanSaluranSpesifikasiSmkkReviewDto): Promise<JalanSaluranSpesifikasiSmkkReview> {
        const ormEntity = plainToInstance(JalanSaluranSpesifikasiSmkkReviewOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async deleteByUsulanJalanId(idUsulanJalan: number): Promise<void> {
        await this.deleteByUsulan(idUsulanJalan, ID_JENIS_USULAN_JALAN);
    }

    async deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void> {
        await this.deleteByUsulan(idUsulanSaluran, ID_JENIS_USULAN_SALURAN);
    }

    async deleteByUsulan(idUsulan: number, idJenisUsulan: number): Promise<void> {
        await this.repo.softDelete({ id_usulan: idUsulan, id_jenis_usulan: idJenisUsulan });
    }

    async findByUsulanJalan(idUsulanJalan: number, page?: number, amount?: number): Promise<[JalanSaluranSpesifikasiSmkkReview[], number]> {
        return this.findByUsulan(idUsulanJalan, ID_JENIS_USULAN_JALAN, page, amount);
    }

    async findByUsulanSaluran(idUsulanSaluran: number, page?: number, amount?: number): Promise<[JalanSaluranSpesifikasiSmkkReview[], number]> {
        return this.findByUsulan(idUsulanSaluran, ID_JENIS_USULAN_SALURAN, page, amount);
    }

    async findByUsulan(idUsulan: number, idJenisUsulan: number, page?: number, amount?: number): Promise<[JalanSaluranSpesifikasiSmkkReview[], number]> {
        const queryBuilder = this.repo
            .createQueryBuilder('jsss_review')
            .select([
                'jsss_review.id',
                'jsss_review.id_jenis_usulan',
                'jsss_review.id_usulan',
                'jsss_review.id_jalan_saluran_smkk',
                'jsss_review.harga_spec',
                'jsss_review.jumlah_barang',
                'jsss_review.harga_satuan'
            ])
            .where('jsss_review.id_usulan = :idUsulan', { idUsulan })
            .andWhere('jsss_review.id_jenis_usulan = :idJenisUsulan', { idJenisUsulan })
            .orderBy('jsss_review.id', 'DESC');

        if (page !== undefined && amount !== undefined) {
            const skip = (page - 1) * amount;
            queryBuilder.skip(skip).take(amount);
        }

        const [entities, total] = await queryBuilder.getManyAndCount();
        return [entities, total];
    }
}

