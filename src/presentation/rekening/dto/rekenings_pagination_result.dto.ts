import { Rekening } from '../../../domain/rekening/rekening.entity';

export class RekeningsPaginationResultDto {
  data!: Rekening[];
  total!: number;
  page!: number;
  amount!: number;
  totalPages!: number;
}
