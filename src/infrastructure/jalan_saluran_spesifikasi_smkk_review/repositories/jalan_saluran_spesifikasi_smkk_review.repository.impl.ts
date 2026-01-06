import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanSaluranSpesifikasiSmkkReviewRepository } from "../../../domain/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.repository";
import { JalanSaluranSpesifikasiSmkkReviewOrmEntity } from "../orm/jalan_saluran_spesifikasi_smkk_review.orm_entity";
import { JalanSaluranSpesifikasiSmkkReview } from "../../../domain/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.entity";
import { CreateJalanSaluranSpesifikasiSmkkReviewDto } from "../../../presentation/jalan_saluran_spesifikasi_smkk_review/dto/create_jalan_saluran_spesifikasi_smkk_review.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class JalanSaluranSpesifikasiSmkkReviewRepositoryImpl implements JalanSaluranSpesifikasiSmkkReviewRepository {
    constructor(@InjectRepository(JalanSaluranSpesifikasiSmkkReviewOrmEntity) private readonly repo: Repository<JalanSaluranSpesifikasiSmkkReviewOrmEntity>) { }

    async create(dto: CreateJalanSaluranSpesifikasiSmkkReviewDto): Promise<JalanSaluranSpesifikasiSmkkReview> {
        try {
            const ormEntity = plainToInstance(JalanSaluranSpesifikasiSmkkReviewOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async deleteByUsulanJalanId(idUsulanJalan: number): Promise<void> {
        try {
            await this.repo.softDelete({ id_usulan_jalan: idUsulanJalan });
        } catch (error) {
            throw error;
        }
    }

    async findByUsulanJalan(idUsulanJalan: number, page?: number, amount?: number): Promise<[JalanSaluranSpesifikasiSmkkReview[], number]> {
        try {
            const queryBuilder = this.repo
                .createQueryBuilder('jsss_review')
                .select([
                    'jsss_review.id',
                    'jsss_review.id_jenis_usulan',
                    'jsss_review.id_usulan_jalan',
                    'jsss_review.id_jalan_saluran_smkk',
                    'jsss_review.harga_spec',
                    'jsss_review.jumlah_barang'
                ])
                .where('jsss_review.id_usulan_jalan = :idUsulanJalan', { idUsulanJalan })
                .orderBy('jsss_review.id', 'DESC');

            if (page !== undefined && amount !== undefined) {
                const skip = (page - 1) * amount;
                queryBuilder.skip(skip).take(amount);
            }

            const [entities, total] = await queryBuilder.getManyAndCount();
            return [entities, total];
        } catch (error) {
            throw error;
        }
    }
}

