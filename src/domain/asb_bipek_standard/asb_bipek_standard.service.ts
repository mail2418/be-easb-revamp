import { AsbBipekStandard } from './asb_bipek_standard.entity';
import { CreateAsbBipekStandardDto } from '../../application/asb_bipek_standard/dto/create_asb_bipek_standard.dto';
import { UpdateAsbBipekStandardDto } from '../../application/asb_bipek_standard/dto/update_asb_bipek_standard.dto';
import { GetAsbBipekStandardByAsbDto } from '../../presentation/asb_bipek_standard/dto/get_asb_bipek_standard_by_asb.dto';

export abstract class AsbBipekStandardService {
    abstract create(dto: CreateAsbBipekStandardDto): Promise<AsbBipekStandard>;
    abstract update(dto: UpdateAsbBipekStandardDto): Promise<AsbBipekStandard>;
    abstract delete(id: number): Promise<void>;
    abstract getById(id: number): Promise<AsbBipekStandard>;
    abstract getByAsb(dto: GetAsbBipekStandardByAsbDto): Promise<{ data: AsbBipekStandard[], total: number, page: number, amount: number, totalPages: number }>;
}
