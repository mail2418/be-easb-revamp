export class UsulanJalanAnalyticsDto {
    totalSukses: number;
    totalTolak: number;
    totalProses: number;
    totalUsulan: number;
    persentaseSukses: number;
    persentaseTolak: number;
    persentaseProses: number;
    totalLentur: number;
    totalKaku: number;
    persentaseLentur: number;
    persentaseKaku: number;
    dailyData: Array<{ date: string; count: number }>;
}
