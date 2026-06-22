import { AsbBipekNonStd } from './asb_bipek_non_std.entity';
import { CreateAsbBipekNonStdDto } from '../../application/asb_bipek_non_std/dto/create_asb_bipek_non_std.dto';
import { UpdateAsbBipekNonStdDto } from '../../application/asb_bipek_non_std/dto/update_asb_bipek_non_std.dto';
import { GetAsbBipekNonStdByAsbDto } from '../../presentation/asb_bipek_non_std/dto/get_asb_bipek_non_std_by_asb.dto';

export abstract class AsbBipekNonStdService {
    abstract create(dto: CreateAsbBipekNonStdDto): Promise<AsbBipekNonStd>;
    abstract update(dto: UpdateAsbBipekNonStdDto): Promise<AsbBipekNonStd>;
    abstract delete(id: number): Promise<void>;
    abstract getById(id: number): Promise<AsbBipekNonStd>;
    abstract getByAsb(dto: GetAsbBipekNonStdByAsbDto): Promise<{ data: AsbBipekNonStd[], total: number, page: number, amount: number, totalPages: number }>;
    abstract deleteByAsbId(idAsb: number): Promise<void>;
}
