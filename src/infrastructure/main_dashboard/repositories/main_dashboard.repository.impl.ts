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
    ) { }

    async findAll(
        search: string | undefined,
        page: number,
        limit: number,
    ): Promise<{ data: MainDashboard[]; total: number }> {
        const skip = (page - 1) * limit;

        const qb = this.repo
            .createQueryBuilder('main_dashboard')
            .orderBy('main_dashboard.createdAt', 'DESC')
            .skip(skip)
            .take(limit);

        // Apply search filter if provided
        if (search) {
            qb.where('LOWER(main_dashboard.namaUsulan) LIKE :search', {
                search: `%${search.toLowerCase()}%`,
            });
        }

        // Get total count
        const totalQb = this.repo.createQueryBuilder('main_dashboard');
        if (search) {
            totalQb.where('LOWER(main_dashboard.namaUsulan) LIKE :search', {
                search: `%${search.toLowerCase()}%`,
            });
        }

        const [entities, total] = await Promise.all([
            qb.getMany(),
            totalQb.getCount(),
        ]);

        const data = entities.map((entity) =>
            plainToInstance(MainDashboard, entity),
        );

        return { data, total };
    }
}

