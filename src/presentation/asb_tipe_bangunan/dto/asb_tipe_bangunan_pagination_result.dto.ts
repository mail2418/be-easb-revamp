import { AsbTipeBangunan } from "../../../domain/asb_tipe_bangunan/asb_tipe_bangunan.entity";

export class AsbTipeBangunanPaginationResultDto {
  data!: AsbTipeBangunan[];
  total!: number;
  page!: number;
  amount!: number;
  totalPages!: number;
}
