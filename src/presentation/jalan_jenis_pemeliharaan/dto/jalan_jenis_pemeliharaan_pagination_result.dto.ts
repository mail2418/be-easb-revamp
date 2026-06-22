import { JalanJenisPemeliharaan } from '../../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.entity';
export class JalanJenisPemeliharaanPaginationResultDto {
    data!: JalanJenisPemeliharaan[]; total!: number; page!: number; amount!: number; totalPages!: number;
}
