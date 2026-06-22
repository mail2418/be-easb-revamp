import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { CreateJalanSaluranSmkkDto } from '../../presentation/jalan_saluran_smkk/dto/create_jalan_saluran_smkk.dto';
import { UpdateJalanSaluranSmkkDto } from '../../presentation/jalan_saluran_smkk/dto/update_jalan_saluran_smkk.dto';
import { JalanSaluranSmkk } from './jalan_saluran_smkk.entity';
import { JalanSaluranSmkkPaginationResultDto } from '../../presentation/jalan_saluran_smkk/dto/jalan_saluran_smkk_pagination_result.dto';
export abstract class JalanSaluranSmkkService {
    abstract create(dto: CreateJalanSaluranSmkkDto): Promise<JalanSaluranSmkk>;
    abstract update(dto: UpdateJalanSaluranSmkkDto): Promise<JalanSaluranSmkk>;
    abstract delete(id: number): Promise<boolean>;
    abstract findAll(dto: PaginationQueryDto): Promise<JalanSaluranSmkkPaginationResultDto>;
    abstract findById(id: number): Promise<JalanSaluranSmkk>;
    abstract findByJenisUsulan(id: number): Promise<JalanSaluranSmkk[]>;
}