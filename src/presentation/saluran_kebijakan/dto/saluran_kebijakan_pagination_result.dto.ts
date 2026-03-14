import { SaluranKebijakan } from "../../../domain/saluran_kebijakan/saluran_kebijakan.entity";

export class SaluranKebijakanPaginationResultDto {
    data!: SaluranKebijakan[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
