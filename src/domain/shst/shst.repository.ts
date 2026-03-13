import { Shst } from "./shst.entity";
import { CreateShstDto } from "../../presentation/shst/dto/create_shst.dto";
import { GetShstDto } from "../../presentation/shst/dto/get_shst.dto";
import { UpdateNominalShstDto } from "../../presentation/shst/dto/update_nominal_shst.dto";
import { DeleteShstDto } from "src/presentation/shst/dto/delete_shst.dto";
import { GetShstNominalDto } from '../../application/shst/dto/get_shst_nominal.dto';

export abstract class ShstRepository {
    abstract create(dto: CreateShstDto): Promise<Shst>;
    abstract delete(dto: DeleteShstDto): Promise<boolean>;
    abstract updateNominal(dto: UpdateNominalShstDto): Promise<Shst>;
    abstract findAll(dto: GetShstDto): Promise<{ data: Shst[]; total: number }>;
    abstract findById(id: number): Promise<Shst | null>;
    abstract findFileById(id: number): Promise<string | null>;
    abstract getNominal(dto: GetShstNominalDto): Promise<number>;
}