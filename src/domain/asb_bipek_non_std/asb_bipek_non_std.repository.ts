import { AsbBipekNonStd } from './asb_bipek_non_std.entity';
import { CreateAsbBipekNonStdDto } from '../../application/asb_bipek_non_std/dto/create_asb_bipek_non_std.dto';
import { UpdateAsbBipekNonStdDto } from '../../application/asb_bipek_non_std/dto/update_asb_bipek_non_std.dto';

export abstract class AsbBipekNonStdRepository {
    abstract create(dto: CreateAsbBipekNonStdDto): Promise<AsbBipekNonStd>;
    abstract update(dto: UpdateAsbBipekNonStdDto): Promise<AsbBipekNonStd>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbBipekNonStd | null>;
    abstract findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBipekNonStd[], number]>;
}
