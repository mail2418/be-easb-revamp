import { JalanSpesifikasiDesain } from '../../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.entity';

export class JalanSpesifikasiDesainPaginationResultDto {
    data!: JalanSpesifikasiDesain[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
