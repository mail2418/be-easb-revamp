import { AsbKlasifikasi } from "../../../domain/asb_klasifikasi/asb_klasifikasi.entity";

export class AsbKlasifikasisPaginationResultDto {
    data!: AsbKlasifikasi[];
    total!: number;
    page!: number;
    amount!: number;
    totalPages!: number;
}
