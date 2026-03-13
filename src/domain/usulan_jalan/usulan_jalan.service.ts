import { UsulanJalan } from './usulan_jalan.entity';

export abstract class UsulanJalanService {
    abstract create(usulan: Partial<UsulanJalan>): Promise<UsulanJalan>;
    abstract findById(id: number): Promise<UsulanJalan>;
    abstract findAll(page: number, amount: number): Promise<{ data: UsulanJalan[]; total: number; page: number; amount: number; totalPages: number }>;
    abstract update(id: number, usulan: Partial<UsulanJalan>): Promise<UsulanJalan>;
    abstract delete(id: number): Promise<boolean>;
}
