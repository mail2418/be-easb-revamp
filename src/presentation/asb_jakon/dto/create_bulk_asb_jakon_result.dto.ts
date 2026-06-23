import { AsbJakon } from '../../../domain/asb_jakon/asb_jakon.entity';

export class CreateBulkAsbJakonResultDto {
    created!: number;
    data!: AsbJakon[];
}
