import { Kelurahan } from './kelurahan.entity';

export abstract class KelurahanRepository {
    abstract create(kelurahan: Partial<Kelurahan>): Promise<Kelurahan>;
    abstract update(id: number, kelurahan: Partial<Kelurahan>): Promise<Kelurahan>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<Kelurahan | null>;
    abstract findAll(page: number, amount: number, filter?: any): Promise<{ data: Kelurahan[]; total: number }>;
    abstract findByKecamatanId(idKecamatan: number): Promise<Kelurahan[]>;
}
