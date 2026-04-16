import { Hspk } from '../../../domain/hspk/hspk.entity';

export class CreateBulkHspkResultDto {
    created!: number;
    data!: Hspk[];
}
