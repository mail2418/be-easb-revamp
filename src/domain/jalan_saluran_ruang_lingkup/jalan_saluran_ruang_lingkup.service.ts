import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { CreateJalanSaluranRuangLingkupDto } from '../../presentation/jalan_saluran_ruang_lingkup/dto/create_jalan_saluran_ruang_lingkup.dto';
import { UpdateJalanSaluranRuangLingkupDto } from '../../presentation/jalan_saluran_ruang_lingkup/dto/update_jalan_saluran_ruang_lingkup.dto';
import { JalanSaluranRuangLingkup } from './jalan_saluran_ruang_lingkup.entity';
import { JalanSaluranRuangLingkupPaginationResultDto } from '../../presentation/jalan_saluran_ruang_lingkup/dto/jalan_saluran_ruang_lingkup_pagination_result.dto';
export abstract class JalanSaluranRuangLingkupService {
    abstract create(dto: CreateJalanSaluranRuangLingkupDto): Promise<JalanSaluranRuangLingkup>;
    abstract update(dto: UpdateJalanSaluranRuangLingkupDto): Promise<JalanSaluranRuangLingkup>;
    abstract delete(id: number): Promise<boolean>;
    abstract findAll(dto: PaginationQueryDto): Promise<JalanSaluranRuangLingkupPaginationResultDto>;
    abstract findById(id: number): Promise<JalanSaluranRuangLingkup>;
}