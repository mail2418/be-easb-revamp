import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { JalanJenisPerkerasan } from './jalan_jenis_perkerasan.entity';
import { CreateJalanJenisPerkerasanDto } from '../../presentation/jalan_jenis_perkerasan/dto/create_jalan_jenis_perkerasan.dto';
import { UpdateJalanJenisPerkerasanDto } from '../../presentation/jalan_jenis_perkerasan/dto/update_jalan_jenis_perkerasan.dto';

export abstract class JalanJenisPerkerasanRepository {
    abstract create(dto: CreateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan>;
    abstract update(dto: UpdateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanJenisPerkerasan | null>;
    abstract findAll(pagination: PaginationQueryDto): Promise<{ data: JalanJenisPerkerasan[]; total: number }>;
}
