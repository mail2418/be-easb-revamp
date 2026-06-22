import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainDashboardController } from './main_dashboard.controller';
import { MainDashboardService } from '../../application/main_dashboard/main_dashboard.service';
import { MainDashboardServiceImpl } from '../../application/main_dashboard/main_dashboard.service.impl';
import { MainDashboardRepository } from '../../domain/main_dashboard/main_dashboard.repository';
import { MainDashboardRepositoryImpl } from '../../infrastructure/main_dashboard/repositories/main_dashboard.repository.impl';
import { MainDashboardOrmEntity } from '../../infrastructure/main_dashboard/orm/main_dashboard.orm_entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([MainDashboardOrmEntity]),
    ],
    controllers: [MainDashboardController],
    providers: [
        {
            provide: MainDashboardService,
            useClass: MainDashboardServiceImpl,
        },
        {
            provide: MainDashboardRepository,
            useClass: MainDashboardRepositoryImpl,
        },
    ],
    exports: [MainDashboardService, MainDashboardRepository],
})
export class MainDashboardModule { }

