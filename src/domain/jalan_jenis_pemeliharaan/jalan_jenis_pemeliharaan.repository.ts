import { CreateJalanJenisPemeliharaanDto } from 'src/presentation/jalan_jenis_pemeliharaan/dto/create_jalan_jenis_pemeliharaan.dto';
import { JalanJenisPemeliharaan } from './jalan_jenis_pemeliharaan.entity';
import { UpdateJalanJenisPemeliharaanDto } from '../../presentation/jalan_jenis_pemeliharaan/dto/update_jalan_jenis_pemeliharaan.dto';
import { GetJalanJenisPemeliharaanDto } from '../../presentation/jalan_jenis_pemeliharaan/dto/get_jalan_jenis_pemeliharaan.dto';

export abstract class JalanJenisPemeliharaanRepository {
    abstract create(dto: CreateJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaan>;
    abstract update(dto: UpdateJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanJenisPemeliharaan | null>;
    abstract findByTingkatPemeliharaan(
        tingkat_pemeliharaan: string,
    ): Promise<JalanJenisPemeliharaan | null>;
    abstract findByJenisPemeliharaan(jenis_pemeliharaan: string): Promise<JalanJenisPemeliharaan[]>;
    abstract findAll(
        dto: GetJalanJenisPemeliharaanDto,
    ): Promise<{ data: JalanJenisPemeliharaan[]; total: number }>;
}
