import { Kecamatan } from './kecamatan.entity';
import { CreateKecamatanDto } from 'src/presentation/kecamatan/dto/create_kecamatan.dto';
import { UpdateKecamatanDto } from 'src/presentation/kecamatan/dto/update_kecamatan.dto';
import { DeleteKecamatanDto } from 'src/presentation/kecamatan/dto/delete_kecamatan.dto';
import { GetKecamatansDto } from 'src/presentation/kecamatan/dto/get_kecamatans.dto';
import { GetKecamatanDetailDto } from 'src/presentation/kecamatan/dto/get_kecamatan_detail.dto';

export abstract class KecamatanService {
    abstract create(dto: CreateKecamatanDto): Promise<Kecamatan>;
    abstract update(dto: UpdateKecamatanDto): Promise<Kecamatan>;
    abstract delete(dto: DeleteKecamatanDto): Promise<void>;
    abstract getById(dto: GetKecamatanDetailDto): Promise<Kecamatan>;
    abstract getAll(dto: GetKecamatansDto): Promise<{ data: Kecamatan[]; total: number; page: number; amount: number; totalPages: number }>;
    abstract getKecamatanByKabkotaId(idKabkota: number): Promise<Kecamatan[]>;
}
