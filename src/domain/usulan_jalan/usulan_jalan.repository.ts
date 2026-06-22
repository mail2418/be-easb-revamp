import { Role } from '../user/user_role.enum';

export interface UsulanJalanListQuery {
    page?: number;
    amount?: number;
    tahunAnggaran?: number;
}

export interface UsulanJalanListResult {
    data: Record<string, unknown>[];
    total: number;
    totalPages: number;
    page: number;
}

export abstract class UsulanJalanRepository {
    abstract create(data: Record<string, unknown>): Promise<{ id: number }>;
    abstract update(id: number, data: Record<string, unknown>): Promise<{ id: number; idUsulanJalanStatus: number }>;
    abstract softDelete(id: number): Promise<boolean>;
    abstract findById(id: number, idOpd?: number | null): Promise<Record<string, unknown> | null>;
    abstract findAll(query: UsulanJalanListQuery, idOpd?: number | null): Promise<UsulanJalanListResult>;
}
