import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, Raw } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UsulanJalanRepository } from '../../../domain/usulan_jalan/usulan_jalan.repository';
import { UsulanJalanOrmEntity } from '../orm/usulan_jalan.orm_entity';
import { UsulanJalanWithRelationsDto } from 'src/application/usulan_jalan/dto/usulan_jalan_with_relations.dto';
import { FindAllUsulanJalanDto } from 'src/application/usulan_jalan/dto/find_all_usulan_jalan.dto';
import { RejectInfoDto } from 'src/application/usulan_jalan/dto/reject_info.dto';
import { GetUsulanJalanAnalyticsFilterDto } from 'src/application/usulan_jalan/dto/get_usulan_jalan_analytics_filter.dto';
import { UsulanJalanAnalyticsDto } from 'src/application/usulan_jalan/dto/usulan_jalan_analytics.dto';

@Injectable()
export class UsulanJalanRepositoryImpl implements UsulanJalanRepository {
    constructor(
        @InjectRepository(UsulanJalanOrmEntity)
        private readonly repo: Repository<UsulanJalanOrmEntity>,
    ) { }

    async findById(id: number, idOpd?: number): Promise<UsulanJalanWithRelationsDto | null> {
        try {
            const whereClause: any = { id };

            // Add OPD filter if provided
            if (idOpd) {
                whereClause.idOpd = idOpd;
            }

            const entity = await this.repo.findOne({
                where: whereClause,
                relations: [
                    'opd',
                    'usulanJalanStatus',
                    'asbJenis',
                    'jalanJenisPemeliharaan',
                    'jalanJenisPerkerasan',
                    'rekening',
                    'rekeningReview',
                    'kabkota',
                    'kecamatan',
                    'kelurahan',
                    'verifikatorAdbang',
                    'verifikatorBpkad',
                    'verifikatorBappeda',
                    'rejectVerifikator',
                    'spesifikasiDesain',
                    'spesifikasiDesain.ruangLingkup',
                    'spesifikasiDesain.hspk',
                    'spesifikasiDesainReview',
                    'spesifikasiDesainReview.spesifikasiDesain',
                    'spesifikasiDesainReview.ruangLingkup',
                    'spesifikasiDesainReview.hspk',
                ],
            });

            if (!entity) {
                return null;
            }
            return plainToInstance(UsulanJalanWithRelationsDto, entity);
        } catch (error) {
            console.log("Error finding Usulan Jalan by ID:", error);
            throw error;
        }
    }

    async findAll(dto: FindAllUsulanJalanDto, idOpd?: number): Promise<{ data: UsulanJalanWithRelationsDto[]; total: number }> {
        try {
            // ✅ SAFE pagination
            const page = dto.page ? Math.max(dto.page, 1) : undefined;
            const amount = dto.amount ? Math.max(dto.amount, 1) : undefined;
            const skip = page && amount ? (page - 1) * amount : undefined;

            // Build where conditions array (shared between main query and count query)
            const whereConditions: string[] = [];
            const whereParams: any = {};

            if (idOpd) {
                whereConditions.push('uj.idOpd = :idOpd');
                whereParams.idOpd = idOpd;
            }

            if (dto.idUsulanJalanStatus) {
                whereConditions.push('uj.idUsulanJalanStatus = :idUsulanJalanStatus');
                whereParams.idUsulanJalanStatus = dto.idUsulanJalanStatus;
            }

            if (dto.tahunAnggaran) {
                whereConditions.push('uj.tahunAnggaran = :tahunAnggaran');
                whereParams.tahunAnggaran = dto.tahunAnggaran;
            }

            if (dto.namaUsulanJalan) {
                whereConditions.push('LOWER(uj.namaUsulan) LIKE :namaUsulanJalan');
                whereParams.namaUsulanJalan = `%${dto.namaUsulanJalan.toLowerCase()}%`;
            }

            if (dto.idKabkota) {
                whereConditions.push('uj.idKabkota = :idKabkota');
                whereParams.idKabkota = dto.idKabkota;
            }

            if (dto.idKecamatan) {
                whereConditions.push('uj.idKecamatan = :idKecamatan');
                whereParams.idKecamatan = dto.idKecamatan;
            }

            if (dto.idKelurahan) {
                whereConditions.push('uj.idKelurahan = :idKelurahan');
                whereParams.idKelurahan = dto.idKelurahan;
            }

            if (dto.idJalanJenisPerkerasan) {
                whereConditions.push('uj.idJalanJenisPerkerasan = :idJalanJenisPerkerasan');
                whereParams.idJalanJenisPerkerasan = dto.idJalanJenisPerkerasan;
            }

            // Use QueryBuilder for optimized query with only necessary relations for list view
            const qb = this.repo.createQueryBuilder('uj')
                .leftJoinAndSelect('uj.opd', 'opd')
                .leftJoinAndSelect('uj.usulanJalanStatus', 'usulanJalanStatus')
                .leftJoinAndSelect('uj.asbJenis', 'asbJenis')
                .leftJoinAndSelect('uj.jalanJenisPemeliharaan', 'jalanJenisPemeliharaan')
                .leftJoinAndSelect('uj.jalanJenisPerkerasan', 'jalanJenisPerkerasan')
                .leftJoinAndSelect('uj.rekening', 'rekening')
                .leftJoinAndSelect('uj.rekeningReview', 'rekeningReview')
                .leftJoinAndSelect('uj.kabkota', 'kabkota')
                .leftJoinAndSelect('uj.kecamatan', 'kecamatan')
                .leftJoinAndSelect('uj.kelurahan', 'kelurahan')
                .leftJoinAndSelect('uj.verifikatorAdbang', 'verifikatorAdbang')
                .leftJoinAndSelect('uj.verifikatorBpkad', 'verifikatorBpkad')
                .leftJoinAndSelect('uj.verifikatorBappeda', 'verifikatorBappeda')
                .leftJoinAndSelect('uj.rejectVerifikator', 'rejectVerifikator')
                // Note: Excluding heavy relations (spesifikasiDesain, spesifikasiDesainReview, etc.)
                // These are only needed for detail view, not list view
                .orderBy('uj.id', 'DESC');

            // Apply where conditions
            if (whereConditions.length > 0) {
                qb.where(whereConditions.join(' AND '), whereParams);
            }

            // Apply pagination if provided
            if (skip !== undefined && amount !== undefined) {
                qb.skip(skip).take(amount);
            }

            // Get total count (without relations for performance)
            const totalQb = this.repo.createQueryBuilder('uj');
            if (whereConditions.length > 0) {
                totalQb.where(whereConditions.join(' AND '), whereParams);
            }

            const [data, total] = await Promise.all([
                qb.getMany(),
                totalQb.getCount()
            ]);

            return {
                data: data.map(e => plainToInstance(UsulanJalanWithRelationsDto, e)),
                total
            };
        } catch (error) {
            console.log("Error finding all Usulan Jalan:", error);
            throw error;
        }
    }

    async create(data: DeepPartial<UsulanJalanOrmEntity>): Promise<UsulanJalanWithRelationsDto> {
        try {
            const entity = this.repo.create(data);
            const saved = await this.repo.save(entity);
            return this.findById(saved.id) as Promise<UsulanJalanWithRelationsDto>;
        } catch (error) {
            console.log("Error creating Usulan Jalan:", error);
            throw error;
        }
    }

    async update(id: number, data: DeepPartial<UsulanJalanOrmEntity>): Promise<UsulanJalanWithRelationsDto> {
        try {
            await this.repo.update(id, data);
            return this.findById(id) as Promise<UsulanJalanWithRelationsDto>;
        } catch (error) {
            console.log("Error updating Usulan Jalan:", error);
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
                rejectVerifId: entity.idRejectVerif,
                rejectReason: entity.rejectReason,
                rejectedAt: entity.rejectVerifikatorReviewAt,
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

    async delete(id: number): Promise<void> {
        try {
            await this.repo.softDelete(id);
        } catch (error) {
            console.log("Error deleting Usulan Jalan:", error);
            throw error;
        }
    }

    async getAnalytics(idOpd?: number, filter?: GetUsulanJalanAnalyticsFilterDto): Promise<UsulanJalanAnalyticsDto> {
        try {
            const qb = this.repo
                .createQueryBuilder('e')
                .select("e.id_usulan_jalan_status", "idUsulanJalanStatus")
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

            qb.groupBy("e.id_usulan_jalan_status");

            const rows = await qb.getRawMany<{ idUsulanJalanStatus: number; count: string }>();

            // Initialize counters
            let totalSukses = 0; // Status 3 (Memenuhi Syarat)
            let totalTolak = 0; // Status 4 (Tidak Memenuhi Syarat)
            let totalProses = 0; // Other Statuses

            // Aggregate counts by status
            rows.forEach(r => {
                const count = Number(r.count);
                const statusId = Number(r.idUsulanJalanStatus);

                if (statusId === 3) {
                    totalSukses += count;
                } else if (statusId === 4) {
                    totalTolak += count;
                } else {
                    totalProses += count;
                }
            });

            const totalUsulan = totalSukses + totalTolak + totalProses;

            // Calculate percentages (avoid division by zero)
            const persentaseSukses = totalUsulan > 0 ? (totalSukses / totalUsulan) * 100 : 0;
            const persentaseTolak = totalUsulan > 0 ? (totalTolak / totalUsulan) * 100 : 0;
            const persentaseProses = totalUsulan > 0 ? (totalProses / totalUsulan) * 100 : 0;

            // Query to count by jenis perkerasan (Lentur vs Kaku)
            const jenisQb = this.repo
                .createQueryBuilder('e')
                .select('e.id_jalan_jenis_perkerasan', 'idJalanJenisPerkerasan')
                .addSelect('COUNT(e.id)', 'count');

            if (idOpd) {
                jenisQb.where('e.id_opd = :idOpd', { idOpd });
            }

            // Apply filter to second query as well
            if (filter?.bulan !== undefined) {
                if (idOpd) {
                    jenisQb.andWhere("EXTRACT(MONTH FROM e.created_at) = :bulan", { bulan: filter.bulan });
                } else {
                    jenisQb.where("EXTRACT(MONTH FROM e.created_at) = :bulan", { bulan: filter.bulan });
                }
            }

            if (filter?.tahun !== undefined) {
                if (idOpd || filter?.bulan !== undefined) {
                    jenisQb.andWhere("e.tahun_anggaran = :tahun", { tahun: filter.tahun });
                } else {
                    jenisQb.where("e.tahun_anggaran = :tahun", { tahun: filter.tahun });
                }
            }

            jenisQb.groupBy('e.id_jalan_jenis_perkerasan');

            const jenisRows = await jenisQb.getRawMany<{ idJalanJenisPerkerasan: number; count: string }>();

            // Initialize jenis counters
            let totalLentur = 0; // Type 1
            let totalKaku = 0; // Type 2

            // Aggregate counts by jenis
            jenisRows.forEach(row => {
                const count = Number(row.count);
                const typeId = Number(row.idJalanJenisPerkerasan);
                if (typeId === 1) {
                    totalLentur = count;
                } else if (typeId === 2) {
                    totalKaku = count;
                }
            });

            // Calculate percentages for jenis (avoid division by zero)
            const persentaseLentur = totalUsulan > 0 ? (totalLentur / totalUsulan) * 100 : 0;
            const persentaseKaku = totalUsulan > 0 ? (totalKaku / totalUsulan) * 100 : 0;

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
                totalSukses,
                totalTolak,
                totalProses,
                totalUsulan,
                persentaseSukses: Number(persentaseSukses.toFixed(2)),
                persentaseTolak: Number(persentaseTolak.toFixed(2)),
                persentaseProses: Number(persentaseProses.toFixed(2)),
                totalLentur,
                totalKaku,
                persentaseLentur: Number(persentaseLentur.toFixed(2)),
                persentaseKaku: Number(persentaseKaku.toFixed(2)),
                dailyData,
            };
        } catch (error) {
            console.log("Error getting Usulan Jalan analytics:", error);
            throw error;
        }
    }
}


