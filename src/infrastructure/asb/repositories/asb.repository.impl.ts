import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeepPartial, EntityManager } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbRepository } from '../../../domain/asb/asb.repository';
import { AsbOrmEntity } from '../orm/asb.orm_entity';
import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';
import { FindAllAsbDto } from 'src/application/asb/dto/find_all_asb.dto';
import { GetAsbByMonthYearDto } from 'src/application/asb/dto/get_asb_by_moth_year.dto';

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
                    'asbDetails',
                    'asbDetailReviews',
                    'asbBipekStandards',
                    'asbBipekStandardReviews',
                    'asbBipekNonStds',
                    'asbBipekNonStdReviews'
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
            const whereClause: any = {};

            // Add OPD filter if provided (for OPD users)
            if (idOpd) {
                whereClause.idOpd = idOpd;
            }

            // Add optional filters
            if (dto.idAsbJenis) {
                whereClause.idAsbJenis = dto.idAsbJenis;
            }

            if (dto.idAsbStatus) {
                whereClause.idAsbStatus = dto.idAsbStatus;
            }

            if (dto.tahunAnggaran) {
                whereClause.tahunAnggaran = dto.tahunAnggaran;
            }

            if (dto.namaAsb) {
                whereClause.namaAsb = ILike(`%${dto.namaAsb}%`);
            }

            if (dto.idTipeBangunan) {
                whereClause.idTipeBangunan = dto.idTipeBangunan;
            }

            const [entities, total] = await this.repo.findAndCount({
                where: whereClause,
                relations: [
                    'kabkota',
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
                    'asbDetails',
                    'asbDetailReviews',
                    'asbBipekStandards',
                    'asbBipekStandardReviews',
                    'asbBipekNonStds',
                    'asbBipekNonStdReviews'
                ],
                skip: (dto.page - 1) * dto.amount,
                take: dto.amount,
                order: { createdAt: 'DESC' },
            });

            const data = entities.map(entity => plainToInstance(AsbWithRelationsDto, entity));

            return { data, total };
        } catch (error) {
            console.log("Error finding all ASBs:", error);
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
            await this.repo.update(id, data);
            console.log("Entity updated:", data);
            const updatedEntity = await this.repo.findOne({
                where: { id },
                relations: [
                    'kabkota',
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
                    'asbDetails',
                    'asbDetailReviews',
                    'asbBipekStandards',
                    'asbBipekStandardReviews',
                    'asbBipekNonStds',
                    'asbBipekNonStdReviews'
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
}
