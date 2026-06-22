import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { CreateJalanJenisPemeliharaanDto } from '../../presentation/jalan_jenis_pemeliharaan/dto/create_jalan_jenis_pemeliharaan.dto';
import { UpdateJalanJenisPemeliharaanDto } from '../../presentation/jalan_jenis_pemeliharaan/dto/update_jalan_jenis_pemeliharaan.dto';
import { DeleteJalanJenisPemeliharaanDto } from '../../presentation/jalan_jenis_pemeliharaan/dto/delete_jalan_jenis_pemeliharaan.dto';
import { JalanJenisPemeliharaan } from './jalan_jenis_pemeliharaan.entity';
import { JalanJenisPemeliharaanPaginationResultDto } from '../../presentation/jalan_jenis_pemeliharaan/dto/jalan_jenis_pemeliharaan_pagination_result.dto';
export abstract class JalanJenisPemeliharaanService {
    abstract create(dto: CreateJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaan>;
    abstract update(dto: UpdateJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaan>;
    abstract delete(dto: DeleteJalanJenisPemeliharaanDto): Promise<boolean>;
    abstract findAll(dto: PaginationQueryDto): Promise<JalanJenisPemeliharaanPaginationResultDto>;
    abstract findById(id: number): Promise<JalanJenisPemeliharaan>;
}
