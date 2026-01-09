import { Injectable } from '@nestjs/common';
import { MainDashboardService } from './main_dashboard.service';
import { MainDashboardRepository } from '../../domain/main_dashboard/main_dashboard.repository';
import { GetMainDashboardDto } from './dto/get_main_dashboard.dto';
import { MainDashboardPaginationResultDto } from './dto/main_dashboard_pagination_result.dto';
import { MainDashboardDto } from './dto/main_dashboard_with_documents.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MainDashboardServiceImpl implements MainDashboardService {
    constructor(
        private readonly repository: MainDashboardRepository,
    ) { }

    async findAll(dto: GetMainDashboardDto): Promise<MainDashboardPaginationResultDto> {
        const page = dto.page ?? 1;
        const limit = dto.limit ?? 10;

            const { data, total } = await this.repository.findAll(
                dto.search,
                dto.tahunAnggaran,
                page,
                limit,
            );

        const dataDto: MainDashboardDto[] = data.map((item) =>
            plainToInstance(MainDashboardDto, item),
        );

        const totalPages = Math.ceil(total / limit);

        return {
            data: dataDto,
            total,
            page,
            limit,
            totalPages,
        };
    }
}

