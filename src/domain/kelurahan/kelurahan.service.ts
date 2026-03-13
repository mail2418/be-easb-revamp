import { Kelurahan } from './kelurahan.entity';
import { CreateKelurahanDto } from 'src/presentation/kelurahan/dto/create_kelurahan.dto';
import { UpdateKelurahanDto } from 'src/presentation/kelurahan/dto/update_kelurahan.dto';
import { DeleteKelurahanDto } from 'src/presentation/kelurahan/dto/delete_kelurahan.dto';
import { GetKelurahansDto } from 'src/presentation/kelurahan/dto/get_kelurahans.dto';
import { GetKelurahanDetailDto } from 'src/presentation/kelurahan/dto/get_kelurahan_detail.dto';

export abstract class KelurahanService {
    abstract create(dto: CreateKelurahanDto): Promise<Kelurahan>;
    abstract update(dto: UpdateKelurahanDto): Promise<Kelurahan>;
    abstract delete(dto: DeleteKelurahanDto): Promise<void>;
    abstract getById(dto: GetKelurahanDetailDto): Promise<Kelurahan>;
    abstract getAll(dto: GetKelurahansDto): Promise<{ data: Kelurahan[]; total: number; page: number; amount: number; totalPages: number }>;
    abstract getKelurahanByKecamatanId(idKecamatan: number): Promise<{ data: Kelurahan[]; total: number; page: number; amount: number; totalPages: number }>;
}
