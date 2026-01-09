import { MainDashboard } from './main_dashboard.entity';

export abstract class MainDashboardRepository {
    abstract findAll(
        search: string | undefined,
        tahunAnggaran: number | undefined,
        page: number,
        limit: number,
    ): Promise<{ data: MainDashboard[]; total: number }>;
}

