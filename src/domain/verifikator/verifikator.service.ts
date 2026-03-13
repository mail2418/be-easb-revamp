import { Verifikator } from './verifikator.entity';

export abstract class VerifikatorService {
    abstract create(verifikator: Partial<Verifikator>): Promise<Verifikator>;
    abstract update(id: number, verifikator: Partial<Verifikator>): Promise<Verifikator>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<Verifikator>;
    abstract findByUserId(userId: number): Promise<Verifikator | null>;
    abstract findAll(page: number, amount: number): Promise<{ data: Verifikator[]; total: number; page: number; amount: number; totalPages: number }>;
    abstract checkVerifikatorType(userId: number): Promise<string>;
}
