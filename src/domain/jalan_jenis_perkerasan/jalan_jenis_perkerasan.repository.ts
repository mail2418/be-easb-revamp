import { CreateJalanJenisPerkerasanDto } from 'src/presentation/jalan_jenis_perkerasan/dto/create_jalan_jenis_perkerasan.dto';
import { JalanJenisPerkerasan } from './jalan_jenis_perkerasan.entity';
import { UpdateJalanJenisPerkerasanDto } from 'src/presentation/jalan_jenis_perkerasan/dto/update_jalan_jenis_perkerasan.dto';
import { GetJalanJenisPerkerasanDto } from 'src/presentation/jalan_jenis_perkerasan/dto/get_jalan_jenis_perkerasan.dto';

export abstract class JalanJenisPerkerasanRepository {
    abstract create(dto: CreateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan>;
    abstract update(dto: UpdateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanJenisPerkerasan | null>;
    abstract findAll(
        dto: GetJalanJenisPerkerasanDto,
    ): Promise<{ data: JalanJenisPerkerasan[]; total: number }>;
    abstract findByJenisPerkerasan(jenis_perkerasan: string): Promise<JalanJenisPerkerasan | null>;
}
