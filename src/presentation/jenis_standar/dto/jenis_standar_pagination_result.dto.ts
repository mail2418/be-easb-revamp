import { JenisStandar } from "../../../domain/jenis_standar/jenis_standar.entity";

export interface JenisStandarPaginationResult {
    jenis_standars: JenisStandar[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
