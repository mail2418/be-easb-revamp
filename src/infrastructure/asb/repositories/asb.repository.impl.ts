import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, EntityManager, Raw } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbRepository } from '../../../domain/asb/asb.repository';
import { AsbOrmEntity } from '../orm/asb.orm_entity';
import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';
import { FindAllAsbDto } from 'src/application/asb/dto/find_all_asb.dto';
import { GetAsbByMonthYearDto } from 'src/application/asb/dto/get_asb_by_moth_year.dto';
import { AsbAnalyticsDto } from 'src/application/asb/dto/asb_analytics.dto';
import { RejectInfoDto } from 'src/application/asb/dto/reject_info.dto';
import { GetAsbAnalyticsFilterDto } from 'src/application/asb/dto/get_asb_analytics_filter.dto';

@Injectable()
export class AsbRepositoryImpl implements AsbRepository {
    constructor(
        @InjectRepository(AsbOrmEntity)
        private readonly repo: Repository<AsbOrmEntity>,
    ) { }

    async findById(id: number, idOpd?: number): Promise<AsbWithRelationsDto | null> {
        const qb = this.repo.createQueryBuilder('asb')
            .leftJoinAndSelect('asb.kabkota', 'kabkota')
            .leftJoinAndSelect('asb.kecamatan', 'kecamatan')
            .leftJoinAndSelect('asb.kelurahan', 'kelurahan')
            .leftJoinAndSelect('asb.asbStatus', 'asbStatus')
            .leftJoinAndSelect('asb.asbJenis', 'asbJenis')
            .leftJoinAndSelect('asb.opd', 'opd')
            .leftJoinAndSelect('asb.asbTipeBangunan', 'asbTipeBangunan')
            .leftJoinAndSelect('asb.asbKlasifikasi', 'asbKlasifikasi')
            .leftJoinAndSelect('asb.rekening', 'rekening')
            .leftJoinAndSelect('asb.rekeningReview', 'rekeningReview')
            .leftJoinAndSelect('asb.verifikatorAdpem', 'verifikatorAdpem')
            .leftJoinAndSelect('asb.verifikatorBPKAD', 'verifikatorBPKAD')
            .leftJoinAndSelect('asb.verifikatorBappeda', 'verifikatorBappeda')
            .leftJoinAndSelect('asb.rejectVerifikator', 'rejectVerifikator')
            .leftJoinAndSelect('asb.asbDetails', 'asbDetails')
            .leftJoinAndSelect('asbDetails.asbLantai', 'asbDetailsLantai')
            .leftJoinAndSelect('asbDetails.asbFungsiRuang', 'asbDetailsFungsiRuang')
            .leftJoinAndSelect('asb.asbDetailReviews', 'asbDetailReviews')
            .leftJoinAndSelect('asbDetailReviews.asbLantai', 'asbDetailReviewsLantai')
            .leftJoinAndSelect('asbDetailReviews.asbFungsiRuang', 'asbDetailReviewsFungsiRuang')
            .leftJoinAndSelect('asb.asbBipekStandards', 'asbBipekStandards')
            .leftJoinAndSelect('asbBipekStandards.asbKomponenBangunanStd', 'asbBipekStandardsKomponen')
            .leftJoinAndSelect('asb.asbBipekStandardReviews', 'asbBipekStandardReviews')
            .leftJoinAndSelect('asbBipekStandardReviews.asbKomponenBangunanStd', 'asbBipekStandardReviewsKomponen')
            .leftJoinAndSelect('asb.asbBipekNonStds', 'asbBipekNonStds')
            .leftJoinAndSelect('asbBipekNonStds.asbKomponenBangunanNonstd', 'asbBipekNonStdsKomponen')
            .leftJoinAndSelect('asb.asbBipekNonStdReviews', 'asbBipekNonStdReviews')
            .leftJoinAndSelect('asbBipekNonStdReviews.asbKomponenBangunanNonstd', 'asbBipekNonStdReviewsKomponen')
            .where('asb.id = :id', { id });

        if (idOpd) {
            qb.andWhere('asb.idOpd = :idOpd', { idOpd });
        }

        const entity = await qb.getOne();

        if (!entity) {
            return null;
        }
        const dto = plainToInstance(AsbWithRelationsDto, entity, {
            enableImplicitConversion: true,
            excludeExtraneousValues: false,
        });
        dto.penyesuaianPerencanaanKonstruksi = entity.penyesuaianPerencanaanKonstruksi != null ? Number(entity.penyesuaianPerencanaanKonstruksi) : null;
        dto.penyesuaianPengawasanKonstruksi = entity.penyesuaianPengawasanKonstruksi != null ? Number(entity.penyesuaianPengawasanKonstruksi) : null;
        dto.penyesuaianManagementKonstruksi = entity.penyesuaianManagementKonstruksi != null ? Number(entity.penyesuaianManagementKonstruksi) : null;
        return dto;
    }

    async findAll(dto: FindAllAsbDto, idOpd?: number): Promise<{ data: AsbWithRelationsDto[]; total: number }> {
        const page = Math.max(dto.page ?? 1, 1);
        const amount = Math.max(dto.amount ?? 10, 1);
        const skip = (page - 1) * amount;

        const whereConditions: string[] = [];
        const whereParams: any = {};

        if (idOpd) {
            whereConditions.push('asb.idOpd = :idOpd');
            whereParams.idOpd = idOpd;
        }

        if (dto.tahunAnggaran) {
            whereConditions.push('asb.tahunAnggaran = :tahunAnggaran');
            whereParams.tahunAnggaran = dto.tahunAnggaran;
        }

        if (dto.idAsbJenis) {
            whereConditions.push('asb.idAsbJenis = :idAsbJenis');
            whereParams.idAsbJenis = dto.idAsbJenis;
        }

        if (dto.idAsbStatus) {
            whereConditions.push('asb.idAsbStatus = :idAsbStatus');
            whereParams.idAsbStatus = dto.idAsbStatus;
        }

        if (dto.namaAsb) {
            whereConditions.push('LOWER(asb.namaAsb) LIKE :namaAsb');
            whereParams.namaAsb = `%${dto.namaAsb.toLowerCase()}%`;
        }

        if (dto.idTipeBangunan) {
            whereConditions.push('asb.idAsbTipeBangunan = :idTipeBangunan');
            whereParams.idTipeBangunan = dto.idTipeBangunan;
        }

        const qb = this.repo.createQueryBuilder('asb')
            .leftJoinAndSelect('asb.kabkota', 'kabkota')
            .leftJoinAndSelect('asb.kecamatan', 'kecamatan')
            .leftJoinAndSelect('asb.kelurahan', 'kelurahan')
            .leftJoinAndSelect('asb.asbStatus', 'asbStatus')
            .leftJoinAndSelect('asb.asbJenis', 'asbJenis')
            .leftJoinAndSelect('asb.opd', 'opd')
            .leftJoinAndSelect('asb.asbTipeBangunan', 'asbTipeBangunan')
            .leftJoinAndSelect('asb.asbKlasifikasi', 'asbKlasifikasi')
            .leftJoinAndSelect('asb.verifikatorAdpem', 'verifikatorAdpem')
            .leftJoinAndSelect('asb.verifikatorBPKAD', 'verifikatorBPKAD')
            .leftJoinAndSelect('asb.verifikatorBappeda', 'verifikatorBappeda')
            .leftJoinAndSelect('asb.rejectVerifikator', 'rejectVerifikator')
            .orderBy('asb.createdAt', 'DESC')
            .skip(skip)
            .take(amount);

        if (whereConditions.length > 0) {
            qb.where(whereConditions.join(' AND '), whereParams);
        }

        const totalQb = this.repo.createQueryBuilder('asb');
        if (whereConditions.length > 0) {
            totalQb.where(whereConditions.join(' AND '), whereParams);
        }

        const [entities, total] = await Promise.all([
            qb.getMany(),
            totalQb.getCount()
        ]);

        const data = entities.map((entity) => {
            const dto = plainToInstance(AsbWithRelationsDto, entity, {
                enableImplicitConversion: true,
                excludeExtraneousValues: false,
            });
            dto.penyesuaianPerencanaanKonstruksi = entity.penyesuaianPerencanaanKonstruksi != null ? Number(entity.penyesuaianPerencanaanKonstruksi) : null;
            dto.penyesuaianPengawasanKonstruksi = entity.penyesuaianPengawasanKonstruksi != null ? Number(entity.penyesuaianPengawasanKonstruksi) : null;
            dto.penyesuaianManagementKonstruksi = entity.penyesuaianManagementKonstruksi != null ? Number(entity.penyesuaianManagementKonstruksi) : null;
            return dto;
        });

        return { data, total };
    }


    async getAllByMonthYear(dto: GetAsbByMonthYearDto, idOpd?: number): Promise<{ date: string; count: number }[]> {
        const startDate = new Date(dto.year, dto.month - 1, 1);
        const endDate = new Date(dto.year, dto.month, 0, 23, 59, 59, 999);

        const qb = this.repo
            .createQueryBuilder('e')
            .select("DATE(e.created_at)", "date")
            .addSelect("COUNT(e.id)", "count");

        if (idOpd) {
            qb.where("e.id_opd = :idOpd", { idOpd })
                .andWhere("e.created_at >= :startDate", { startDate })
                .andWhere("e.created_at <= :endDate", { endDate });
        } else {
            qb.where("e.created_at >= :startDate", { startDate })
                .andWhere("e.created_at <= :endDate", { endDate });
        }

        qb.groupBy("DATE(e.created_at)")
            .orderBy("DATE(e.created_at)", "ASC");

        const rows = await qb.getRawMany<{ date: string; count: string }>();

        return rows.map(r => ({
            date: r.date,
            count: Number(r.count),
        }));
    }

    async getAsbStatusCountsByMonthYear(dto: GetAsbByMonthYearDto, idOpd?: number): Promise<{ idAsbStatus: number; count: number }[]> {
        const startDate = new Date(dto.year, dto.month - 1, 1);
        const endDate = new Date(dto.year, dto.month, 0, 23, 59, 59, 999);

        const qb = this.repo
            .createQueryBuilder('e')
            .select("e.id_asb_status", "idAsbStatus")
            .addSelect("COUNT(e.id)", "count");

        if (idOpd) {
            qb.where("e.id_opd = :idOpd", { idOpd })
                .andWhere("e.created_at >= :startDate", { startDate })
                .andWhere("e.created_at <= :endDate", { endDate });
        } else {
            qb.where("e.created_at >= :startDate", { startDate })
                .andWhere("e.created_at <= :endDate", { endDate });
        }

        qb.groupBy("e.id_asb_status");

        const rows = await qb.getRawMany<{ idAsbStatus: number; count: string }>();

        return rows.map(r => ({
            idAsbStatus: Number(r.idAsbStatus),
            count: Number(r.count),
        }));
    }

    async getAsbAnalytics(idOpd?: number, filter?: GetAsbAnalyticsFilterDto): Promise<AsbAnalyticsDto> {
        const qb = this.repo
            .createQueryBuilder('e')
            .select("e.id_asb_status", "idAsbStatus")
            .addSelect("COUNT(e.id)", "count");

        const whereConditions: string[] = [];
        const whereParams: any = {};

        if (idOpd) {
            whereConditions.push("e.id_opd = :idOpd");
            whereParams.idOpd = idOpd;
        }

        if (filter?.bulan !== undefined && filter?.tahun !== undefined) {
            const startDate = new Date(filter.tahun, filter.bulan - 1, 1);
            const endDate = new Date(filter.tahun, filter.bulan, 0, 23, 59, 59, 999);
            whereConditions.push("e.created_at >= :startDate");
            whereConditions.push("e.created_at <= :endDate");
            whereParams.startDate = startDate;
            whereParams.endDate = endDate;
        } else if (filter?.bulan !== undefined) {
            const currentYear = new Date().getFullYear();
            const startDate = new Date(currentYear, filter.bulan - 1, 1);
            const endDate = new Date(currentYear, filter.bulan, 0, 23, 59, 59, 999);
            whereConditions.push("e.created_at >= :startDate");
            whereConditions.push("e.created_at <= :endDate");
            whereParams.startDate = startDate;
            whereParams.endDate = endDate;
        }

        if (filter?.tahun !== undefined) {
            whereConditions.push("e.tahun_anggaran = :tahun");
            whereParams.tahun = filter.tahun;
        }

        if (whereConditions.length > 0) {
            qb.where(whereConditions.join(' AND '), whereParams);
        }

        qb.groupBy("e.id_asb_status");

        const rows = await qb.getRawMany<{ idAsbStatus: number; count: string }>();

        let totalSuksesBangunan = 0;
        let totalTolakBangunan = 0;
        let totalProsesBangunan = 0;

        rows.forEach(r => {
            const count = Number(r.count);
            const statusId = Number(r.idAsbStatus);

            if (statusId === 8) {
                totalSuksesBangunan += count;
            } else if (statusId === 7) {
                totalTolakBangunan += count;
            } else if ((statusId >= 1 && statusId <= 6) || (statusId >= 9 && statusId <= 13)) {
                totalProsesBangunan += count;
            }
        });

        const totalUsulan = totalSuksesBangunan + totalTolakBangunan + totalProsesBangunan;

        const persentaseSukses = totalUsulan > 0 ? (totalSuksesBangunan / totalUsulan) * 100 : 0;
        const persentaseTolak = totalUsulan > 0 ? (totalTolakBangunan / totalUsulan) * 100 : 0;
        const persentaseProses = totalUsulan > 0 ? (totalProsesBangunan / totalUsulan) * 100 : 0;

        const jenisQb = this.repo
            .createQueryBuilder('e')
            .innerJoin('e.asbJenis', 'aj')
            .select('aj.jenis', 'jenis')
            .addSelect('COUNT(e.id)', 'count');

        const jenisWhereConditions: string[] = [];
        const jenisWhereParams: any = {};

        if (idOpd) {
            jenisWhereConditions.push('e.id_opd = :idOpd');
            jenisWhereParams.idOpd = idOpd;
        }

        if (filter?.bulan !== undefined && filter?.tahun !== undefined) {
            const startDate = new Date(filter.tahun, filter.bulan - 1, 1);
            const endDate = new Date(filter.tahun, filter.bulan, 0, 23, 59, 59, 999);
            jenisWhereConditions.push('e.created_at >= :startDate');
            jenisWhereConditions.push('e.created_at <= :endDate');
            jenisWhereParams.startDate = startDate;
            jenisWhereParams.endDate = endDate;
        } else if (filter?.bulan !== undefined) {
            const currentYear = new Date().getFullYear();
            const startDate = new Date(currentYear, filter.bulan - 1, 1);
            const endDate = new Date(currentYear, filter.bulan, 0, 23, 59, 59, 999);
            jenisWhereConditions.push('e.created_at >= :startDate');
            jenisWhereConditions.push('e.created_at <= :endDate');
            jenisWhereParams.startDate = startDate;
            jenisWhereParams.endDate = endDate;
        }

        if (filter?.tahun !== undefined) {
            jenisWhereConditions.push('e.tahun_anggaran = :tahun');
            jenisWhereParams.tahun = filter.tahun;
        }

        if (jenisWhereConditions.length > 0) {
            jenisQb.where(jenisWhereConditions.join(' AND '), jenisWhereParams);
        }

        jenisQb.groupBy('aj.jenis');

        const jenisRows = await jenisQb.getRawMany<{ jenis: string; count: string }>();

        let totalPembangunan = 0;
        let totalPemeliharaan = 0;

        jenisRows.forEach(row => {
            const count = Number(row.count);
            if (row.jenis === 'Pembangunan') {
                totalPembangunan = count;
            } else if (row.jenis === 'Pemeliharaan') {
                totalPemeliharaan = count;
            }
        });

        const persentasePembangunan = totalUsulan > 0 ? (totalPembangunan / totalUsulan) * 100 : 0;
        const persentasePemeliharaan = totalUsulan > 0 ? (totalPemeliharaan / totalUsulan) * 100 : 0;

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
            totalSuksesBangunan,
            totalTolakBangunan,
            totalProsesBangunan,
            totalUsulan,
            persentaseSukses: Number(persentaseSukses.toFixed(2)),
            persentaseTolak: Number(persentaseTolak.toFixed(2)),
            persentaseProses: Number(persentaseProses.toFixed(2)),
            totalPembangunan,
            totalPemeliharaan,
            persentasePembangunan: Number(persentasePembangunan.toFixed(2)),
            persentasePemeliharaan: Number(persentasePemeliharaan.toFixed(2)),
            dailyData,
        };
    }

    async create(data: DeepPartial<AsbOrmEntity>): Promise<AsbWithRelationsDto> {
        const entity = this.repo.create(data);
        const savedEntity = await this.repo.save(entity);
            
        const entityWithBasicRelations = await this.repo.createQueryBuilder('asb')
            .leftJoinAndSelect('asb.kabkota', 'kabkota')
            .leftJoinAndSelect('asb.kecamatan', 'kecamatan')
            .leftJoinAndSelect('asb.kelurahan', 'kelurahan')
            .leftJoinAndSelect('asb.asbStatus', 'asbStatus')
            .leftJoinAndSelect('asb.asbJenis', 'asbJenis')
            .leftJoinAndSelect('asb.opd', 'opd')
            .leftJoinAndSelect('asb.asbTipeBangunan', 'asbTipeBangunan')
            .leftJoinAndSelect('asb.asbKlasifikasi', 'asbKlasifikasi')
            .leftJoinAndSelect('asb.rekening', 'rekening')
            .leftJoinAndSelect('asb.rekeningReview', 'rekeningReview')
            .leftJoinAndSelect('asb.verifikatorAdpem', 'verifikatorAdpem')
            .leftJoinAndSelect('asb.verifikatorBPKAD', 'verifikatorBPKAD')
            .leftJoinAndSelect('asb.verifikatorBappeda', 'verifikatorBappeda')
            .leftJoinAndSelect('asb.rejectVerifikator', 'rejectVerifikator')
            .where('asb.id = :id', { id: savedEntity.id })
            .getOne();
        
        return plainToInstance(AsbWithRelationsDto, entityWithBasicRelations);
    }

    async update(id: number, data: DeepPartial<AsbOrmEntity>): Promise<AsbWithRelationsDto> {
        await this.repo.update(id, data);
        
        const updatedEntity = await this.repo.createQueryBuilder('asb')
            .leftJoinAndSelect('asb.kabkota', 'kabkota')
            .leftJoinAndSelect('asb.kecamatan', 'kecamatan')
            .leftJoinAndSelect('asb.kelurahan', 'kelurahan')
            .leftJoinAndSelect('asb.asbStatus', 'asbStatus')
            .leftJoinAndSelect('asb.asbJenis', 'asbJenis')
            .leftJoinAndSelect('asb.opd', 'opd')
            .leftJoinAndSelect('asb.asbTipeBangunan', 'asbTipeBangunan')
            .leftJoinAndSelect('asb.asbKlasifikasi', 'asbKlasifikasi')
            .leftJoinAndSelect('asb.rekening', 'rekening')
            .leftJoinAndSelect('asb.rekeningReview', 'rekeningReview')
            .leftJoinAndSelect('asb.verifikatorAdpem', 'verifikatorAdpem')
            .leftJoinAndSelect('asb.verifikatorBPKAD', 'verifikatorBPKAD')
            .leftJoinAndSelect('asb.verifikatorBappeda', 'verifikatorBappeda')
            .leftJoinAndSelect('asb.rejectVerifikator', 'rejectVerifikator')
            .where('asb.id = :id', { id })
            .getOne();
        
        return plainToInstance(AsbWithRelationsDto, updatedEntity);
    }

    async delete(id: number): Promise<void> {
        await this.repo.softDelete(id);
    }

    async getRejectInfo(id: number, idOpd?: number): Promise<RejectInfoDto | null> {
        const qb = this.repo.createQueryBuilder('asb')
            .leftJoinAndSelect('asb.rejectVerifikator', 'rejectVerifikator')
            .select([
                'asb.rejectVerifId',
                'asb.rejectReason',
                'asb.rejectedAt',
                'rejectVerifikator.id',
                'rejectVerifikator.username'
            ])
            .where('asb.id = :id', { id });

        if (idOpd) {
            qb.andWhere('asb.idOpd = :idOpd', { idOpd });
        }

        const entity = await qb.getOne();

        if (!entity) {
            return null;
        }

        return {
            rejectVerifId: entity.rejectVerifId,
            rejectReason: entity.rejectReason,
            rejectedAt: entity.rejectedAt,
            rejectVerifikator: entity.rejectVerifikator
                ? {
                    id: entity.rejectVerifikator.id,
                    username: entity.rejectVerifikator.username,
                }
                : null,
            verifikator: null,
        };
    }
}
