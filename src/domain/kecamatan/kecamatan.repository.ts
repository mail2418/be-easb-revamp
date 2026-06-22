import { Kecamatan } from './kecamatan.entity';

export abstract class KecamatanRepository {
    abstract create(kecamatan: Partial<Kecamatan>): Promise<Kecamatan>;
    abstract update(id: number, kecamatan: Partial<Kecamatan>): Promise<Kecamatan>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<Kecamatan | null>;
    abstract findAll(page: number | undefined, amount: number | undefined, filter?: any): Promise<{ data: Kecamatan[]; total: number }>;
    abstract findByKabkotaId(idKabkota: number): Promise<Kecamatan[]>;
}
