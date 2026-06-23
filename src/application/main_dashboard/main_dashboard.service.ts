import { GetMainDashboardDto } from './dto/get_main_dashboard.dto';
import { MainDashboardPaginationResultDto } from './dto/main_dashboard_pagination_result.dto';
import { Role } from '../../domain/user/user_role.enum';

export abstract class MainDashboardService {
    abstract findAll(
        dto: GetMainDashboardDto,
        userIdOpd: number | null,
        userRoles: Role[],
    ): Promise<MainDashboardPaginationResultDto>;
}
