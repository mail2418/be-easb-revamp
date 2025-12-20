import { JalanSmkk } from "../../../domain/jalan_smkk/jalan_smkk.entity";

export class JalanSmkkPaginationResultDto {
    data!: JalanSmkk[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
