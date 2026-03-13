import { AsbLantai } from "../../../domain/asb_lantai/asb_lantai.entity";

export class AsbLantaiPaginationResultDto {
  data: AsbLantai[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
