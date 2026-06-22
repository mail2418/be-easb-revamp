import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { CreateJalanJenisPerkerasanDto } from '../../presentation/jalan_jenis_perkerasan/dto/create_jalan_jenis_perkerasan.dto';
import { UpdateJalanJenisPerkerasanDto } from '../../presentation/jalan_jenis_perkerasan/dto/update_jalan_jenis_perkerasan.dto';
import { DeleteJalanJenisPerkerasanDto } from '../../presentation/jalan_jenis_perkerasan/dto/delete_jalan_jenis_perkerasan.dto';
import { JalanJenisPerkerasan } from './jalan_jenis_perkerasan.entity';
import { JalanJenisPerkerasanPaginationResultDto } from '../../presentation/jalan_jenis_perkerasan/dto/jalan_jenis_perkerasan_pagination_result.dto';

export abstract class JalanJenisPerkerasanService {
    abstract create(dto: CreateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan>;
    abstract update(dto: UpdateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan>;
    abstract delete(dto: DeleteJalanJenisPerkerasanDto): Promise<boolean>;
    abstract findAll(dto: PaginationQueryDto): Promise<JalanJenisPerkerasanPaginationResultDto>;
    abstract findById(id: number): Promise<JalanJenisPerkerasan>;
}
