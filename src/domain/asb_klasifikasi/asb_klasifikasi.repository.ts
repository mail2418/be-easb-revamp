import { GetAsbKlasifikasisDto } from 'src/presentation/asb_klasifikasi/dto/get_asb_klasifikasis.dto';
import { AsbKlasifikasi } from './asb_klasifikasi.entity';
import { CreateAsbKlasifikasiDto } from 'src/presentation/asb_klasifikasi/dto/create_asb_klasifikasi.dto';

export abstract class AsbKlasifikasiRepository {
    abstract create(asbKlasifikasi: CreateAsbKlasifikasiDto): Promise<AsbKlasifikasi>;
    abstract update(id: number, asbKlasifikasi: Partial<AsbKlasifikasi>): Promise<AsbKlasifikasi>;
    abstract delete(id: number): Promise<boolean>;
    abstract findAll(pagination: GetAsbKlasifikasisDto): Promise<{ data: AsbKlasifikasi[]; total: number}>;
    abstract findById(id: number): Promise<AsbKlasifikasi | null>;
    abstract findByAsbTipeBangunan(id_asb_tipe_bangunan: number): Promise<AsbKlasifikasi | null>;
    abstract findByKlasifikasi (klasifikasi: string): Promise<AsbKlasifikasi | null>;
}
