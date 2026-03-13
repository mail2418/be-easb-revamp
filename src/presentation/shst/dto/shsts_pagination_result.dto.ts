import { Shst } from "../../../domain/shst/shst.entity";

export class ShstsPaginationResultDto {
  data!: Shst[];
  total!: number;
  page!: number;
  amount!: number;
  totalPages!: number;
}
