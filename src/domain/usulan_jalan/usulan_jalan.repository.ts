import { UsulanJalan } from './usulan_jalan.entity';

export abstract class UsulanJalanRepository {
    abstract create(usulan: Partial<UsulanJalan>): Promise<UsulanJalan>;
    abstract update(id: number, usulan: Partial<UsulanJalan>): Promise<UsulanJalan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<UsulanJalan | null>;
    abstract findAll(page: number, limit: number): Promise<{ data: UsulanJalan[]; total: number }>;
}
