import { MainDashboardDto } from './main_dashboard_with_documents.dto';

export class MainDashboardPaginationResultDto {
    data: MainDashboardDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

