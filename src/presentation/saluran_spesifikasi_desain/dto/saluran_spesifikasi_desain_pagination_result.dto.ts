import { SaluranSpesifikasiDesain } from "../../../domain/saluran_spesifikasi_desain/saluran_spesifikasi_desain.entity";

export class SaluranSpesifikasiDesainPaginationResultDto {
    data!: SaluranSpesifikasiDesain[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
