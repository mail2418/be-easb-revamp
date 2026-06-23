import { JalanKebijakan } from '../../../domain/jalan_kebijakan/jalan_kebijakan.entity';

export class JalanKebijakanPaginationResultDto {
    data!: JalanKebijakan[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
