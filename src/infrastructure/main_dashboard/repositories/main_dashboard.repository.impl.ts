import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { MainDashboardRepository } from '../../../domain/main_dashboard/main_dashboard.repository';
import { MainDashboard } from '../../../domain/main_dashboard/main_dashboard.entity';
import { MainDashboardOrmEntity } from '../orm/main_dashboard.orm_entity';

@Injectable()
export class MainDashboardRepositoryImpl implements MainDashboardRepository {
    constructor(
        @InjectRepository(MainDashboardOrmEntity)
        private readonly repo: Repository<MainDashboardOrmEntity>,
    ) {}

    async findAll(
        search: string | undefined,
        tahunAnggaran: number | undefined,
        idJenisUsulan: number | undefined,
        idOpd: number | undefined,
        page: number,
        limit: number,
    ): Promise<{ data: MainDashboard[]; total: number }> {
        const skip = (page - 1) * limit;

        const qb = this.repo
            .createQueryBuilder('main_dashboard')
            .orderBy('main_dashboard.createdAt', 'DESC')
            .skip(skip)
            .take(limit);

        const whereConditions: string[] = [];
        const whereParams: Record<string, string | number> = {};

        if (search) {
            whereConditions.push('LOWER(main_dashboard.namaUsulan) LIKE :search');
            whereParams.search = `%${search.toLowerCase()}%`;
        }

        if (tahunAnggaran !== undefined) {
            whereConditions.push('main_dashboard.tahunAnggaran = :tahunAnggaran');
            whereParams.tahunAnggaran = tahunAnggaran;
        }

        if (idJenisUsulan !== undefined) {
            whereConditions.push('main_dashboard.idJenisUsulan = :idJenisUsulan');
            whereParams.idJenisUsulan = idJenisUsulan;
        }

        if (idOpd !== undefined) {
            whereConditions.push(`(
                (main_dashboard.idJenisUsulan = 1 AND EXISTS (
                    SELECT 1 FROM asb a
                    WHERE a.id = main_dashboard.idUsulan
                      AND a.id_opd = :idOpd
                      AND a.deleted_at IS NULL
                ))
                OR (main_dashboard.idJenisUsulan = 2 AND EXISTS (
                    SELECT 1 FROM usulan_jalan uj
                    WHERE uj.id = main_dashboard.idUsulan
                      AND uj.id_opd = :idOpd
                      AND uj.deleted_at IS NULL
                ))
                OR (main_dashboard.idJenisUsulan = 3 AND EXISTS (
                    SELECT 1 FROM usulan_saluran us
                    WHERE us.id = main_dashboard.idUsulan
                      AND us.id_opd = :idOpd
                      AND us.deleted_at IS NULL
                ))
            )`);
            whereParams.idOpd = idOpd;
        }

        if (whereConditions.length > 0) {
            qb.where(whereConditions.join(' AND '), whereParams);
        }

        const totalQb = this.repo.createQueryBuilder('main_dashboard');
        if (whereConditions.length > 0) {
            totalQb.where(whereConditions.join(' AND '), whereParams);
        }

        const [entities, total] = await Promise.all([qb.getMany(), totalQb.getCount()]);

        const data = entities.map((entity) => plainToInstance(MainDashboard, entity));

        return { data, total };
    }

    async create(data: {
        idUsulan: number;
        idJenisUsulan: number;
        idAsbStatus: number;
        namaUsulan: string;
        rejectInfo?: string | null;
        tahunAnggaran?: number | null;
    }): Promise<MainDashboard> {
        const existing = await this.repo.findOne({
            where: {
                idUsulan: data.idUsulan,
                idJenisUsulan: data.idJenisUsulan,
            },
        });
        if (existing) {
            return plainToInstance(MainDashboard, existing);
        }

        const entity = this.repo.create(data);
        const saved = await this.repo.save(entity);
        return plainToInstance(MainDashboard, saved);
    }

    async updateByUsulan(
        idUsulan: number,
        idJenisUsulan: number,
        data: {
            idAsbStatus?: number;
            namaUsulan?: string;
            rejectInfo?: string | null;
            tahunAnggaran?: number | null;
        },
    ): Promise<void> {
        await this.repo.update({ idUsulan, idJenisUsulan }, data);
    }
}
