export interface UsulanSaluranListQuery {
    page?: number;
    amount?: number;
    tahunAnggaran?: number;
    idUsulanSaluranStatus?: number;
    namaUsulanSaluran?: string;
    idKabkota?: number;
    idKecamatan?: number;
    idKelurahan?: number;
    idTipeSaluran?: number;
}

export interface UsulanSaluranListResult {
    data: Record<string, unknown>[];
    total: number;
    totalPages: number;
    page: number;
}

export abstract class UsulanSaluranRepository {
    abstract create(data: Record<string, unknown>): Promise<{ id: number }>;
    abstract update(id: number, data: Record<string, unknown>): Promise<{ id: number; idUsulanSaluranStatus: number }>;
    abstract softDelete(id: number): Promise<boolean>;
    abstract findById(id: number, idOpd?: number | null): Promise<Record<string, unknown> | null>;
    abstract findAll(query: UsulanSaluranListQuery, idOpd?: number | null): Promise<UsulanSaluranListResult>;
}
