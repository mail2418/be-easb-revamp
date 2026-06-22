import { MainDashboard } from './main_dashboard.entity';

export abstract class MainDashboardRepository {
    abstract findAll(
        search: string | undefined,
        tahunAnggaran: number | undefined,
        idJenisUsulan: number | undefined,
        idOpd: number | undefined,
        page: number,
        limit: number,
    ): Promise<{ data: MainDashboard[]; total: number }>;
    abstract create(data: { idUsulan: number; idJenisUsulan: number; idAsbStatus: number; namaUsulan: string; rejectInfo?: string | null; tahunAnggaran?: number | null }): Promise<MainDashboard>;
    abstract updateByUsulan(idUsulan: number, idJenisUsulan: number, data: { idAsbStatus?: number; namaUsulan?: string; rejectInfo?: string | null; tahunAnggaran?: number | null }): Promise<void>;
}

