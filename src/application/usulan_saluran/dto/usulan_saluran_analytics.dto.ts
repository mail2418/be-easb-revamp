export class UsulanSaluranAnalyticsDto {
    totalSukses: number;
    totalTolak: number;
    totalProses: number;
    totalUsulan: number;
    persentaseSukses: number;
    persentaseTolak: number;
    persentaseProses: number;
    dailyData: Array<{ date: string; count: number }>;
}
