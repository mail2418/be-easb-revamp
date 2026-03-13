import { Opd } from '../../../domain/opd/opd.entity';

export class OpdsPaginationResultDto {
  data!: Opd[];
  total!: number;
  page!: number;
  amount!: number;
  totalPages!: number;
}
