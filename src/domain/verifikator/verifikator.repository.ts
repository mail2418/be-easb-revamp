import { Verifikator } from './verifikator.entity';

export abstract class VerifikatorRepository {
    abstract create(verifikator: Verifikator): Promise<Verifikator>;
    abstract update(id: number, verifikator: Partial<Verifikator>): Promise<Verifikator>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<Verifikator | null>;
    abstract findByUserId(userId: number): Promise<Verifikator | null>;
    abstract findAll(page: number, amount: number): Promise<{ data: Verifikator[]; total: number }>;
    abstract checkVerifikatorType(userId: number): Promise<string | null>;
}
