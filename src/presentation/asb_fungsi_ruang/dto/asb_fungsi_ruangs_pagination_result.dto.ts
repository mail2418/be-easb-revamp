import { AsbFungsiRuang } from '../../../domain/asb_fungsi_ruang/asb_fungsi_ruang.entity';

export class AsbFungsiRuangsPaginationResultDto {
  data!: AsbFungsiRuang[];
  total!: number;
  page!: number;
  limit!: number;
  totalPages!: number;
}
