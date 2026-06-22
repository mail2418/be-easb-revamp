import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { CreateJalanJenisPemeliharaanDto } from '../../presentation/jalan_jenis_pemeliharaan/dto/create_jalan_jenis_pemeliharaan.dto';
import { UpdateJalanJenisPemeliharaanDto } from '../../presentation/jalan_jenis_pemeliharaan/dto/update_jalan_jenis_pemeliharaan.dto';
import { JalanJenisPemeliharaan } from './jalan_jenis_pemeliharaan.entity';
export abstract class JalanJenisPemeliharaanRepository {
    abstract create(dto: CreateJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaan>;
    abstract update(dto: UpdateJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanJenisPemeliharaan | null>;
    abstract findAll(pagination: PaginationQueryDto): Promise<{ data: JalanJenisPemeliharaan[]; total: number }>;
}
