import { GetMainDashboardDto } from './dto/get_main_dashboard.dto';
import { MainDashboardPaginationResultDto } from './dto/main_dashboard_pagination_result.dto';

export abstract class MainDashboardService {
    abstract findAll(dto: GetMainDashboardDto): Promise<MainDashboardPaginationResultDto>;
}

