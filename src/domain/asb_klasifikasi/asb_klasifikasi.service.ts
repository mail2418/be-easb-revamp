import { CreateAsbKlasifikasiDto } from 'src/presentation/asb_klasifikasi/dto/create_asb_klasifikasi.dto';
import { AsbKlasifikasi } from './asb_klasifikasi.entity';
import { GetAsbKlasifikasisDto } from 'src/presentation/asb_klasifikasi/dto/get_asb_klasifikasis.dto';
import { UpdateAsbKlasifikasiDto } from 'src/presentation/asb_klasifikasi/dto/update_asb_klasifikasi.dto';

export abstract class AsbKlasifikasiService {
    abstract create(asbKlasifikasi: CreateAsbKlasifikasiDto): Promise<AsbKlasifikasi>;
    abstract update(asbKlasifikasi: UpdateAsbKlasifikasiDto): Promise<AsbKlasifikasi>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<AsbKlasifikasi | null>;
    abstract findByAsbTipeBangunan(id_asb_tipe_bangunan: number): Promise<AsbKlasifikasi | null>;
    abstract findByKlasifikasi(klasifikasi: string): Promise<AsbKlasifikasi | null>;
    abstract findAll(pagination: GetAsbKlasifikasisDto): Promise<{ data: AsbKlasifikasi[]; total: number }>;
}
