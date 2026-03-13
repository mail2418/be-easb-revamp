import { AsbBipekStandard } from './asb_bipek_standard.entity';
import { CreateAsbBipekStandardDto } from '../../application/asb_bipek_standard/dto/create_asb_bipek_standard.dto';
import { UpdateAsbBipekStandardDto } from '../../application/asb_bipek_standard/dto/update_asb_bipek_standard.dto';

export abstract class AsbBipekStandardRepository {
    abstract create(dto: CreateAsbBipekStandardDto): Promise<AsbBipekStandard>;
    abstract update(dto: UpdateAsbBipekStandardDto): Promise<AsbBipekStandard>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbBipekStandard | null>;
    abstract findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBipekStandard[], number]>;
}
