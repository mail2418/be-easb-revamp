export class AsbAnalyticsDto {
    totalSuksesBangunan: number;
    totalTolakBangunan: number;
    totalProsesBangunan: number;
    totalUsulan: number;
    persentaseSukses: number;
    persentaseTolak: number;
    persentaseProses: number;
    totalPembangunan: number;
    totalPemeliharaan: number;
    persentasePembangunan: number;
    persentasePemeliharaan: number;
    dailyData: Array<{ date: string; count: number }>;
}
