import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { CreateJalanSaluranSmkkDto } from '../../presentation/jalan_saluran_smkk/dto/create_jalan_saluran_smkk.dto';
import { UpdateJalanSaluranSmkkDto } from '../../presentation/jalan_saluran_smkk/dto/update_jalan_saluran_smkk.dto';
import { JalanSaluranSmkk } from './jalan_saluran_smkk.entity';
export abstract class JalanSaluranSmkkRepository {
    abstract create(dto: CreateJalanSaluranSmkkDto): Promise<JalanSaluranSmkk>;
    abstract update(dto: UpdateJalanSaluranSmkkDto): Promise<JalanSaluranSmkk>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanSaluranSmkk | null>;
    abstract findAll(pagination: PaginationQueryDto): Promise<{ data: JalanSaluranSmkk[]; total: number }>;
    abstract findByJenisUsulan(id: number): Promise<JalanSaluranSmkk[]>;
}