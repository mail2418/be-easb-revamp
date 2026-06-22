import { Injectable, ForbiddenException } from '@nestjs/common';
import { MainDashboardService } from './main_dashboard.service';
import { MainDashboardRepository } from '../../domain/main_dashboard/main_dashboard.repository';
import { GetMainDashboardDto } from './dto/get_main_dashboard.dto';
import { MainDashboardPaginationResultDto } from './dto/main_dashboard_pagination_result.dto';
import { MainDashboardDto } from './dto/main_dashboard_with_documents.dto';
import { plainToInstance } from 'class-transformer';
import { Role } from '../../domain/user/user_role.enum';

@Injectable()
export class MainDashboardServiceImpl implements MainDashboardService {
    constructor(
        private readonly repository: MainDashboardRepository,
    ) { }

    async findAll(
        dto: GetMainDashboardDto,
        userIdOpd: number | null,
        userRoles: Role[],
    ): Promise<MainDashboardPaginationResultDto> {
        const page = dto.page ?? 1;
        const limit = dto.limit ?? 10;

        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
        const isVerifikator = userRoles.includes(Role.VERIFIKATOR);
        const isOpd = userRoles.includes(Role.OPD);

        let idOpd: number | undefined;
        if (isAdmin || isSuperAdmin || isVerifikator) {
            idOpd = undefined;
        } else if (isOpd) {
            if (!userIdOpd) {
                throw new ForbiddenException('OPD user has no associated OPD');
            }
            idOpd = userIdOpd;
        } else {
            throw new ForbiddenException('User is not authorized to access main dashboard');
        }

        const { data, total } = await this.repository.findAll(
            dto.search,
            dto.tahunAnggaran,
            dto.idJenisUsulan,
            idOpd,
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

