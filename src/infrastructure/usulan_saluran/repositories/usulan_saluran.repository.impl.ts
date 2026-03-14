import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UsulanSaluranRepository } from '../../../domain/usulan_saluran/usulan_saluran.repository';
import { UsulanSaluranOrmEntity } from '../orm/usulan_saluran.orm_entity';
import { UsulanSaluranWithRelationsDto } from 'src/application/usulan_saluran/dto/usulan_saluran_with_relations.dto';
import { FindAllUsulanSaluranDto } from 'src/application/usulan_saluran/dto/find_all_usulan_saluran.dto';
import { RejectInfoSaluranDto } from 'src/application/usulan_saluran/dto/reject_info.dto';
import { GetUsulanSaluranAnalyticsFilterDto } from 'src/application/usulan_saluran/dto/get_usulan_saluran_analytics_filter.dto';
import { UsulanSaluranAnalyticsDto } from 'src/application/usulan_saluran/dto/usulan_saluran_analytics.dto';

@Injectable()
export class UsulanSaluranRepositoryImpl implements UsulanSaluranRepository {
    constructor(
        @InjectRepository(UsulanSaluranOrmEntity)
        private readonly repo: Repository<UsulanSaluranOrmEntity>,
    ) { }

    async findById(id: number, idOpd?: number): Promise<UsulanSaluranWithRelationsDto | null> {
        const qb = this.repo.createQueryBuilder('us')
            .leftJoinAndSelect('us.opd', 'opd')
            .leftJoinAndSelect('us.usulanSaluranStatus', 'usulanSaluranStatus')
            .leftJoinAndSelect('us.asbJenis', 'asbJenis')
            .leftJoinAndSelect('us.tipeSaluran', 'tipeSaluran')
            .leftJoinAndSelect('us.rekening', 'rekening')
            .leftJoinAndSelect('us.rekeningReview', 'rekeningReview')
            .leftJoinAndSelect('us.kabkota', 'kabkota')
            .leftJoinAndSelect('us.kecamatan', 'kecamatan')
            .leftJoinAndSelect('us.kelurahan', 'kelurahan')
            .leftJoinAndSelect('us.verifikatorAdbang', 'verifikatorAdbang')
            .leftJoinAndSelect('us.verifikatorBpkad', 'verifikatorBpkad')
            .leftJoinAndSelect('us.verifikatorBappeda', 'verifikatorBappeda')
            .leftJoinAndSelect('us.rejectVerifikator', 'rejectVerifikator')
            .leftJoinAndSelect('us.spesifikasiDesain', 'spesifikasiDesain')
            .leftJoinAndSelect('spesifikasiDesain.ruangLingkup', 'spesifikasiDesainRuangLingkup')
            .leftJoinAndSelect('spesifikasiDesain.hspk', 'spesifikasiDesainHspk')
            .leftJoinAndSelect('us.spesifikasiDesainReview', 'spesifikasiDesainReview')
            .leftJoinAndSelect('spesifikasiDesainReview.ruangLingkup', 'spesifikasiDesainReviewRuangLingkup')
            .leftJoinAndSelect('spesifikasiDesainReview.hspk', 'spesifikasiDesainReviewHspk')
            .leftJoinAndSelect('us.spesifikasiSmkk', 'spesifikasiSmkk')
            .leftJoinAndSelect('spesifikasiSmkk.jenisUsulan', 'spesifikasiSmkkJenisUsulan')
            .leftJoinAndSelect('spesifikasiSmkk.jalanSaluranSmkk', 'spesifikasiSmkkJalanSaluranSmkk')
            .leftJoinAndSelect('us.spesifikasiSmkkReview', 'spesifikasiSmkkReview')
            .leftJoinAndSelect('spesifikasiSmkkReview.jenisUsulan', 'spesifikasiSmkkReviewJenisUsulan')
            .leftJoinAndSelect('spesifikasiSmkkReview.jalanSaluranSmkk', 'spesifikasiSmkkReviewJalanSaluranSmkk')
            .where('us.id = :id', { id });

        if (idOpd) {
            qb.andWhere('us.idOpd = :idOpd', { idOpd });
        }

        const entity = await qb.getOne();

        if (!entity) {
            return null;
        }
        return plainToInstance(UsulanSaluranWithRelationsDto, entity);
    }

    async findAll(dto: FindAllUsulanSaluranDto, idOpd?: number): Promise<{ data: UsulanSaluranWithRelationsDto[]; total: number }> {
        const page = dto.page ? Math.max(dto.page, 1) : undefined;
        const amount = dto.amount ? Math.max(dto.amount, 1) : undefined;
        const skip = page && amount ? (page - 1) * amount : undefined;

        const whereConditions: string[] = [];
        const whereParams: any = {};

        if (idOpd) {
            whereConditions.push('us.idOpd = :idOpd');
            whereParams.idOpd = idOpd;
        }

        if (dto.tahunAnggaran) {
            whereConditions.push('us.tahunAnggaran = :tahunAnggaran');
            whereParams.tahunAnggaran = dto.tahunAnggaran;
        }

        if (dto.idUsulanSaluranStatus) {
            whereConditions.push('us.idUsulanSaluranStatus = :idUsulanSaluranStatus');
            whereParams.idUsulanSaluranStatus = dto.idUsulanSaluranStatus;
        }

        if (dto.namaUsulanSaluran) {
            whereConditions.push('LOWER(us.namaUsulan) LIKE :namaUsulanSaluran');
            whereParams.namaUsulanSaluran = `%${dto.namaUsulanSaluran.toLowerCase()}%`;
        }

        if (dto.idKabkota) {
            whereConditions.push('us.idKabkota = :idKabkota');
            whereParams.idKabkota = dto.idKabkota;
        }

        if (dto.idKecamatan) {
            whereConditions.push('us.idKecamatan = :idKecamatan');
            whereParams.idKecamatan = dto.idKecamatan;
        }

        if (dto.idKelurahan) {
            whereConditions.push('us.idKelurahan = :idKelurahan');
            whereParams.idKelurahan = dto.idKelurahan;
        }

        if (dto.idTipeSaluran) {
            whereConditions.push('us.idTipeSaluran = :idTipeSaluran');
            whereParams.idTipeSaluran = dto.idTipeSaluran;
        }

        const qb = this.repo.createQueryBuilder('us')
            .leftJoinAndSelect('us.opd', 'opd')
            .leftJoinAndSelect('us.usulanSaluranStatus', 'usulanSaluranStatus')
            .leftJoinAndSelect('us.asbJenis', 'asbJenis')
            .leftJoinAndSelect('us.tipeSaluran', 'tipeSaluran')
            .leftJoinAndSelect('us.kabkota', 'kabkota')
            .leftJoinAndSelect('us.kecamatan', 'kecamatan')
            .leftJoinAndSelect('us.kelurahan', 'kelurahan')
            .leftJoinAndSelect('us.verifikatorAdbang', 'verifikatorAdbang')
            .leftJoinAndSelect('us.verifikatorBpkad', 'verifikatorBpkad')
            .leftJoinAndSelect('us.verifikatorBappeda', 'verifikatorBappeda')
            .leftJoinAndSelect('us.rejectVerifikator', 'rejectVerifikator')
            .orderBy('us.id', 'DESC');

        if (whereConditions.length > 0) {
            qb.where(whereConditions.join(' AND '), whereParams);
        }

        if (skip !== undefined && amount !== undefined) {
            qb.skip(skip).take(amount);
        }

        const totalQb = this.repo.createQueryBuilder('us');
        if (whereConditions.length > 0) {
            totalQb.where(whereConditions.join(' AND '), whereParams);
        }

        const [data, total] = await Promise.all([
            qb.getMany(),
            totalQb.getCount()
        ]);

        return {
            data: data.map(e => plainToInstance(UsulanSaluranWithRelationsDto, e)),
            total
        };
    }

    async create(data: DeepPartial<UsulanSaluranOrmEntity>): Promise<UsulanSaluranWithRelationsDto> {
        const entity = this.repo.create(data);
        const saved = await this.repo.save(entity);

        const entityWithBasicRelations = await this.repo.createQueryBuilder('us')
            .leftJoinAndSelect('us.opd', 'opd')
            .leftJoinAndSelect('us.usulanSaluranStatus', 'usulanSaluranStatus')
            .leftJoinAndSelect('us.asbJenis', 'asbJenis')
            .leftJoinAndSelect('us.tipeSaluran', 'tipeSaluran')
            .leftJoinAndSelect('us.rekening', 'rekening')
            .leftJoinAndSelect('us.rekeningReview', 'rekeningReview')
            .leftJoinAndSelect('us.kabkota', 'kabkota')
            .leftJoinAndSelect('us.kecamatan', 'kecamatan')
            .leftJoinAndSelect('us.kelurahan', 'kelurahan')
            .leftJoinAndSelect('us.verifikatorAdbang', 'verifikatorAdbang')
            .leftJoinAndSelect('us.verifikatorBpkad', 'verifikatorBpkad')
            .leftJoinAndSelect('us.verifikatorBappeda', 'verifikatorBappeda')
            .leftJoinAndSelect('us.rejectVerifikator', 'rejectVerifikator')
            .where('us.id = :id', { id: saved.id })
            .getOne();

        return plainToInstance(UsulanSaluranWithRelationsDto, entityWithBasicRelations);
    }

    async update(id: number, data: DeepPartial<UsulanSaluranOrmEntity>): Promise<UsulanSaluranWithRelationsDto> {
        await this.repo.update(id, data);

        const updatedEntity = await this.repo.createQueryBuilder('us')
            .leftJoinAndSelect('us.opd', 'opd')
            .leftJoinAndSelect('us.usulanSaluranStatus', 'usulanSaluranStatus')
            .leftJoinAndSelect('us.asbJenis', 'asbJenis')
            .leftJoinAndSelect('us.tipeSaluran', 'tipeSaluran')
            .leftJoinAndSelect('us.rekening', 'rekening')
            .leftJoinAndSelect('us.rekeningReview', 'rekeningReview')
            .leftJoinAndSelect('us.kabkota', 'kabkota')
            .leftJoinAndSelect('us.kecamatan', 'kecamatan')
            .leftJoinAndSelect('us.kelurahan', 'kelurahan')
            .leftJoinAndSelect('us.verifikatorAdbang', 'verifikatorAdbang')
            .leftJoinAndSelect('us.verifikatorBpkad', 'verifikatorBpkad')
            .leftJoinAndSelect('us.verifikatorBappeda', 'verifikatorBappeda')
            .leftJoinAndSelect('us.rejectVerifikator', 'rejectVerifikator')
            .where('us.id = :id', { id })
            .getOne();

        return plainToInstance(UsulanSaluranWithRelationsDto, updatedEntity);
    }

    async getRejectInfo(id: number, idOpd?: number): Promise<RejectInfoSaluranDto | null> {
        const qb = this.repo.createQueryBuilder('us')
            .select('us.idRejectVerif', 'rejectVerifId')
            .addSelect('us.rejectReason', 'rejectReason')
            .addSelect('us.rejectVerifikatorReviewAt', 'rejectedAt')
            .leftJoin('us.rejectVerifikator', 'rejectVerifikator')
            .addSelect('rejectVerifikator.id', 'rejectVerifikatorId')
            .addSelect('rejectVerifikator.username', 'rejectVerifikatorUsername')
            .where('us.id = :id', { id });

        if (idOpd) {
            qb.andWhere('us.idOpd = :idOpd', { idOpd });
        }

        const result = await qb.getRawOne<{
            rejectVerifId: number | null;
            rejectReason: string | null;
            rejectedAt: Date | null;
            rejectVerifikatorId: number | null;
            rejectVerifikatorUsername: string | null;
        }>();

        if (!result) {
            return null;
        }

        return {
            rejectVerifId: result.rejectVerifId,
            rejectReason: result.rejectReason,
            rejectedAt: result.rejectedAt,
            rejectVerifikator: result.rejectVerifikatorId
                ? {
                    id: result.rejectVerifikatorId,
                    username: result.rejectVerifikatorUsername || '',
                }
                : null,
            verifikator: null,
        };
    }

    async delete(id: number): Promise<void> {
        await this.repo.softDelete(id);
    }

    async getAnalytics(idOpd?: number, filter?: GetUsulanSaluranAnalyticsFilterDto): Promise<UsulanSaluranAnalyticsDto> {
        const qb = this.repo
            .createQueryBuilder('e')
            .select("e.id_usulan_saluran_status", "idUsulanSaluranStatus")
            .addSelect("COUNT(e.id)", "count");

        if (idOpd) {
            qb.where("e.id_opd = :idOpd", { idOpd });
        }

        if (filter?.bulan !== undefined && filter?.tahun !== undefined) {
            const startDate = new Date(filter.tahun, filter.bulan - 1, 1);
            const endDate = new Date(filter.tahun, filter.bulan, 0, 23, 59, 59, 999);

            if (idOpd) {
                qb.andWhere("e.created_at >= :startDate", { startDate })
                    .andWhere("e.created_at <= :endDate", { endDate });
            } else {
                qb.where("e.created_at >= :startDate", { startDate })
                    .andWhere("e.created_at <= :endDate", { endDate });
            }
        } else if (filter?.bulan !== undefined) {
            if (idOpd) {
                qb.andWhere("EXTRACT(MONTH FROM e.created_at) = :bulan", { bulan: filter.bulan });
            } else {
                qb.where("EXTRACT(MONTH FROM e.created_at) = :bulan", { bulan: filter.bulan });
            }
        }

        if (filter?.tahun !== undefined && filter?.bulan === undefined) {
            if (idOpd) {
                qb.andWhere("e.tahun_anggaran = :tahun", { tahun: filter.tahun });
            } else {
                qb.where("e.tahun_anggaran = :tahun", { tahun: filter.tahun });
            }
        }

        qb.groupBy("e.id_usulan_saluran_status");

        const rows = await qb.getRawMany<{ idUsulanSaluranStatus: number; count: string }>();

        let totalSukses = 0;
        let totalTolak = 0;
        let totalProses = 0;

        rows.forEach(r => {
            const count = Number(r.count);
            const statusId = Number(r.idUsulanSaluranStatus);

            if (statusId === 3) {
                totalSukses += count;
            } else if (statusId === 4) {
                totalTolak += count;
            } else {
                totalProses += count;
            }
        });

        const totalUsulan = totalSukses + totalTolak + totalProses;

        const persentaseSukses = totalUsulan > 0 ? (totalSukses / totalUsulan) * 100 : 0;
        const persentaseTolak = totalUsulan > 0 ? (totalTolak / totalUsulan) * 100 : 0;
        const persentaseProses = totalUsulan > 0 ? (totalProses / totalUsulan) * 100 : 0;

        let dailyData: Array<{ date: string; count: number }> = [];
        if (filter?.bulan !== undefined && filter?.tahun !== undefined) {
            const startDate = new Date(filter.tahun, filter.bulan - 1, 1);
            const endDate = new Date(filter.tahun, filter.bulan, 0, 23, 59, 59, 999);

            const dailyQb = this.repo
                .createQueryBuilder('e')
                .select("DATE(e.created_at)", "date")
                .addSelect("COUNT(e.id)", "count");

            if (idOpd) {
                dailyQb.where("e.id_opd = :idOpd", { idOpd })
                    .andWhere("e.created_at >= :startDate", { startDate })
                    .andWhere("e.created_at <= :endDate", { endDate });
            } else {
                dailyQb.where("e.created_at >= :startDate", { startDate })
                    .andWhere("e.created_at <= :endDate", { endDate });
            }

            dailyQb.groupBy("DATE(e.created_at)")
                .orderBy("DATE(e.created_at)", "ASC");

            const dailyRows = await dailyQb.getRawMany<{ date: string; count: string }>();
            dailyData = dailyRows.map(r => ({
                date: r.date,
                count: Number(r.count),
            }));
        }

        return {
            totalSukses,
            totalTolak,
            totalProses,
            totalUsulan,
            persentaseSukses: Number(persentaseSukses.toFixed(2)),
            persentaseTolak: Number(persentaseTolak.toFixed(2)),
            persentaseProses: Number(persentaseProses.toFixed(2)),
            dailyData,
        };
    }
}
