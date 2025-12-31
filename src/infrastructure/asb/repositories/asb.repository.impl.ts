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
        try {
            const whereClause: any = { id };

            // Add OPD filter if provided
            if (idOpd) {
                whereClause.idOpd = idOpd;
            }

            const entity = await this.repo.findOne({
                where: whereClause,
                relations: [
                    'kabkota',
                    'kecamatan',
                    'kelurahan',
                    'asbStatus',
                    'asbJenis',
                    'opd',
                    'asbTipeBangunan',
                    'asbKlasifikasi',
                    'rekening',
                    'rekeningReview',
                    'verifikatorAdpem',
                    'verifikatorBPKAD',
                    'verifikatorBappeda',
                    'rejectVerifikator',
                    'asbDetails',
                    'asbDetails.asbLantai',
                    'asbDetails.asbFungsiRuang',
                    'asbDetailReviews',
                    'asbDetailReviews.asbLantai',
                    'asbDetailReviews.asbFungsiRuang',
                    'asbBipekStandards',
                    'asbBipekStandards.asbKomponenBangunanStd',
                    'asbBipekStandardReviews',
                    'asbBipekStandardReviews.asbKomponenBangunanStd',
                    'asbBipekNonStds',
                    'asbBipekNonStds.asbKomponenBangunanNonstd',
                    'asbBipekNonStdReviews',
                    'asbBipekNonStdReviews.asbKomponenBangunanNonstd'
                ],
            });

            if (!entity) {
                return null;
            }
            return plainToInstance(AsbWithRelationsDto, entity);
        } catch (error) {
            console.log("Error finding ASB by ID:", error);
            throw error;
        }
    }

    async findAll(dto: FindAllAsbDto, idOpd?: number): Promise<{ data: AsbWithRelationsDto[]; total: number }> {
        try {
            // ✅ SAFE pagination
            const page = Math.max(dto.page ?? 1, 1);
            const amount = Math.max(dto.amount ?? 10, 1);
            const skip = (page - 1) * amount;

            // Build where conditions array (shared between main query and count query)
            const whereConditions: string[] = [];
            const whereParams: any = {};

            if (idOpd) {
                whereConditions.push('asb.idOpd = :idOpd');
                whereParams.idOpd = idOpd;
            }

            if (dto.idAsbJenis) {
                whereConditions.push('asb.idAsbJenis = :idAsbJenis');
                whereParams.idAsbJenis = dto.idAsbJenis;
            }

            if (dto.idAsbStatus) {
                whereConditions.push('asb.idAsbStatus = :idAsbStatus');
                whereParams.idAsbStatus = dto.idAsbStatus;
            }

            if (dto.tahunAnggaran) {
                whereConditions.push('asb.tahunAnggaran = :tahunAnggaran');
                whereParams.tahunAnggaran = dto.tahunAnggaran;
            }

            if (dto.namaAsb) {
                whereConditions.push('LOWER(asb.namaAsb) LIKE :namaAsb');
                whereParams.namaAsb = `%${dto.namaAsb.toLowerCase()}%`;
            }

            if (dto.idTipeBangunan) {
                whereConditions.push('asb.idAsbTipeBangunan = :idTipeBangunan');
                whereParams.idTipeBangunan = dto.idTipeBangunan;
            }

            // Use QueryBuilder for optimized query with only necessary relations for list view
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
                // Note: Excluding heavy relations (asbDetails, asbDetailReviews, asbBipekStandards, etc.)
                // These are only needed for detail view, not list view
                .orderBy('asb.createdAt', 'DESC')
                .skip(skip)
                .take(amount);

            // Apply where conditions
            if (whereConditions.length > 0) {
                qb.where(whereConditions.join(' AND '), whereParams);
            }

            // Get total count (without relations for performance)
            const totalQb = this.repo.createQueryBuilder('asb');
            if (whereConditions.length > 0) {
                totalQb.where(whereConditions.join(' AND '), whereParams);
            }

            const [entities, total] = await Promise.all([
                qb.getMany(),
                totalQb.getCount()
            ]);

            const data = entities.map((entity) =>
                plainToInstance(AsbWithRelationsDto, entity),
            );

            return { data, total };
        } catch (error) {
            console.error('Error finding all ASBs:', error);
            throw error;
        }
    }


    async getAllByMonthYear(dto: GetAsbByMonthYearDto, idOpd?: number): Promise<{ date: string; count: number }[]> {
        try {
            const whereClause: any = {};

            // Add OPD filter if provided (for OPD users)
            if (idOpd) {
                whereClause.idOpd = idOpd;
            }

            // Count id and group by date(created_at), between month/year
            const qb = this.repo
                .createQueryBuilder('e')
                .select("DATE(e.created_at)", "date")
                .addSelect("COUNT(e.id)", "count")
                .where("EXTRACT(MONTH FROM e.created_at) = :month", { month: dto.month })
                .andWhere("EXTRACT(YEAR FROM e.created_at) = :year", { year: dto.year })
                .groupBy("DATE(e.created_at)")
                .orderBy("DATE(e.created_at)", "ASC");

            if (idOpd) {
                qb.andWhere("e.id_opd = :idOpd", { idOpd });
            }

            const rows = await qb.getRawMany<{ date: string; count: string }>();

            return rows.map(r => ({
                date: r.date,
                count: Number(r.count),
            }));
        } catch (error) {
            console.log("Error getting ASB by month/year:", error);
            throw error;
        }
    }

    async getAsbStatusCountsByMonthYear(dto: GetAsbByMonthYearDto, idOpd?: number): Promise<{ idAsbStatus: number; count: number }[]> {
        try {
            const qb = this.repo
                .createQueryBuilder('e')
                .select("e.id_asb_status", "idAsbStatus")
                .addSelect("COUNT(e.id)", "count")
                .where("EXTRACT(MONTH FROM e.created_at) = :month", { month: dto.month })
                .andWhere("EXTRACT(YEAR FROM e.created_at) = :year", { year: dto.year })
                .groupBy("e.id_asb_status");

            if (idOpd) {
                qb.andWhere("e.id_opd = :idOpd", { idOpd });
            }

            const rows = await qb.getRawMany<{ idAsbStatus: number; count: string }>();

            return rows.map(r => ({
                idAsbStatus: Number(r.idAsbStatus),
                count: Number(r.count),
            }));
        } catch (error) {
            console.log("Error getting ASB status counts:", error);
            throw error;
        }
    }

    async getAsbAnalytics(idOpd?: number, filter?: GetAsbAnalyticsFilterDto): Promise<AsbAnalyticsDto> {
        try {
            const qb = this.repo
                .createQueryBuilder('e')
                .select("e.id_asb_status", "idAsbStatus")
                .addSelect("COUNT(e.id)", "count");

            if (idOpd) {
                qb.where("e.id_opd = :idOpd", { idOpd });
            }

            // Apply month filter if provided
            if (filter?.bulan !== undefined) {
                if (idOpd) {
                    qb.andWhere("EXTRACT(MONTH FROM e.created_at) = :bulan", { bulan: filter.bulan });
                } else {
                    qb.where("EXTRACT(MONTH FROM e.created_at) = :bulan", { bulan: filter.bulan });
                }
            }

            // Apply year filter if provided (using tahun_anggaran field)
            if (filter?.tahun !== undefined) {
                if (idOpd || filter?.bulan !== undefined) {
                    qb.andWhere("e.tahun_anggaran = :tahun", { tahun: filter.tahun });
                } else {
                    qb.where("e.tahun_anggaran = :tahun", { tahun: filter.tahun });
                }
            }

            qb.groupBy("e.id_asb_status");

            const rows = await qb.getRawMany<{ idAsbStatus: number; count: string }>();

            // Initialize counters
            let totalSuksesBangunan = 0; // Status 8
            let totalTolakBangunan = 0; // Status 7
            let totalProsesBangunan = 0; // Status 1-6

            // Aggregate counts by status
            rows.forEach(r => {
                const count = Number(r.count);
                const statusId = Number(r.idAsbStatus);

                if (statusId === 8) {
                    totalSuksesBangunan += count;
                } else if (statusId === 7) {
                    totalTolakBangunan += count;
                } else if ((statusId >= 1 && statusId <= 6) || (statusId >= 9 && statusId <= 13)) {
                    // Status 1-6: Pengisian OPD (Created -> Submitted)
                    // Status 9-13: Proses Verifikasi (Verify Lantai -> Verify Pekerjaan)
                    totalProsesBangunan += count;
                }
            });

            const totalUsulan = totalSuksesBangunan + totalTolakBangunan + totalProsesBangunan;

            // Calculate percentages (avoid division by zero)
            const persentaseSukses = totalUsulan > 0 ? (totalSuksesBangunan / totalUsulan) * 100 : 0;
            const persentaseTolak = totalUsulan > 0 ? (totalTolakBangunan / totalUsulan) * 100 : 0;
            const persentaseProses = totalUsulan > 0 ? (totalProsesBangunan / totalUsulan) * 100 : 0;

            // Query to count by jenis (Pembangunan and Pemeliharaan)
            const jenisQb = this.repo
                .createQueryBuilder('e')
                .innerJoin('e.asbJenis', 'aj')
                .select('aj.jenis', 'jenis')
                .addSelect('COUNT(e.id)', 'count');

            if (idOpd) {
                jenisQb.where('e.id_opd = :idOpd', { idOpd });
            }

            // Apply month filter if provided
            if (filter?.bulan !== undefined) {
                if (idOpd) {
                    jenisQb.andWhere('EXTRACT(MONTH FROM e.created_at) = :bulan', { bulan: filter.bulan });
                } else {
                    jenisQb.where('EXTRACT(MONTH FROM e.created_at) = :bulan', { bulan: filter.bulan });
                }
            }

            // Apply year filter if provided (using tahun_anggaran field)
            if (filter?.tahun !== undefined) {
                if (idOpd || filter?.bulan !== undefined) {
                    jenisQb.andWhere('e.tahun_anggaran = :tahun', { tahun: filter.tahun });
                } else {
                    jenisQb.where('e.tahun_anggaran = :tahun', { tahun: filter.tahun });
                }
            }

            jenisQb.groupBy('aj.jenis');

            const jenisRows = await jenisQb.getRawMany<{ jenis: string; count: string }>();

            // Initialize jenis counters
            let totalPembangunan = 0;
            let totalPemeliharaan = 0;

            // Aggregate counts by jenis
            jenisRows.forEach(row => {
                const count = Number(row.count);
                if (row.jenis === 'Pembangunan') {
                    totalPembangunan = count;
                } else if (row.jenis === 'Pemeliharaan') {
                    totalPemeliharaan = count;
                }
            });

            // Calculate percentages for jenis (avoid division by zero)
            const persentasePembangunan = totalUsulan > 0 ? (totalPembangunan / totalUsulan) * 100 : 0;
            const persentasePemeliharaan = totalUsulan > 0 ? (totalPemeliharaan / totalUsulan) * 100 : 0;

            // Query daily data if month and year are provided
            let dailyData: Array<{ date: string; count: number }> = [];
            if (filter?.bulan !== undefined && filter?.tahun !== undefined) {
                const dailyQb = this.repo
                    .createQueryBuilder('e')
                    .select("DATE(e.created_at)", "date")
                    .addSelect("COUNT(e.id)", "count")
                    .where("EXTRACT(MONTH FROM e.created_at) = :bulan", { bulan: filter.bulan })
                    .andWhere("EXTRACT(YEAR FROM e.created_at) = :tahun", { tahun: filter.tahun });

                if (idOpd) {
                    dailyQb.andWhere("e.id_opd = :idOpd", { idOpd });
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
        } catch (error) {
            console.log("Error getting ASB analytics:", error);
            throw error;
        }
    }

    async create(data: DeepPartial<AsbOrmEntity>): Promise<AsbWithRelationsDto> {
        try {
            const entity = this.repo.create(data);
            console.log("Entity created:", entity);
            const savedEntity = await this.repo.save(entity);
            return plainToInstance(AsbWithRelationsDto, savedEntity);
        } catch (error) {
            console.log("Error creating ASB:", error);
            throw error;
        }
    }

    async update(id: number, data: DeepPartial<AsbOrmEntity>): Promise<AsbWithRelationsDto> {
        try {
            console.log("Data to update:", data);
            await this.repo.update(id, data);
            const updatedEntity = await this.repo.findOne({
                where: { id },
                relations: [
                    'kabkota',
                    'kecamatan',
                    'kelurahan',
                    'asbStatus',
                    'asbJenis',
                    'opd',
                    'asbTipeBangunan',
                    'asbKlasifikasi',
                    'rekening',
                    'rekeningReview',
                    'verifikatorAdpem',
                    'verifikatorBPKAD',
                    'verifikatorBappeda',
                    'rejectVerifikator',
                    'asbDetails',
                    'asbDetails.asbLantai',
                    'asbDetails.asbFungsiRuang',
                    'asbDetailReviews',
                    'asbDetailReviews.asbLantai',
                    'asbDetailReviews.asbFungsiRuang',
                    'asbBipekStandards',
                    'asbBipekStandards.asbKomponenBangunanStd',
                    'asbBipekStandardReviews',
                    'asbBipekStandardReviews.asbKomponenBangunanStd',
                    'asbBipekNonStds',
                    'asbBipekNonStds.asbKomponenBangunanNonstd',
                    'asbBipekNonStdReviews',
                    'asbBipekNonStdReviews.asbKomponenBangunanNonstd'
                ],
            });
            return plainToInstance(AsbWithRelationsDto, updatedEntity);
        } catch (error) {
            console.log("Error updating ASB:", error);
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.repo.softDelete(id);
        } catch (error) {
            console.log("Error deleting ASB:", error);
            throw error;
        }
    }

    async getRejectInfo(id: number, idOpd?: number): Promise<RejectInfoDto | null> {
        try {
            const whereClause: any = { id };

            // Add OPD filter if provided
            if (idOpd) {
                whereClause.idOpd = idOpd;
            }

            const entity = await this.repo.findOne({
                where: whereClause,
                relations: ['rejectVerifikator'],
            });

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
                verifikator: null, // Will be populated in service layer
            };
        } catch (error) {
            console.log("Error getting reject info:", error);
            throw error;
        }
    }
}
