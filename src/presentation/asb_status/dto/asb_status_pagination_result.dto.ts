import { AsbStatus } from "../../../domain/asb_status/asb_status.entity";

export class AsbStatusPaginationResultDto {
  data: AsbStatus[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
