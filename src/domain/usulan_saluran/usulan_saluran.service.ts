import { Role } from '../user/user_role.enum';
import { UsulanSaluranListQuery, UsulanSaluranListResult } from './usulan_saluran.repository';

export abstract class UsulanSaluranService {
    abstract storeIndex(
        dto: Record<string, unknown>,
        userIdOpd: number | null,
        userRoles: Role[],
        isUpdate: boolean,
    ): Promise<{ id: number }>;

    abstract storeInformasi(
        dto: Record<string, unknown>,
        userIdOpd: number | null,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }>;

    abstract verifyIndex(
        dto: Record<string, unknown>,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }>;

    abstract verifyInformasi(
        dto: Record<string, unknown>,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }>;

    abstract verifyAdbang(
        idUsulanSaluran: number,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }>;

    abstract verifyBpkad(
        dto: Record<string, unknown>,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }>;

    abstract verifyBappeda(
        idUsulanSaluran: number,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }>;

    abstract reject(
        idUsulanSaluran: number,
        rejectReason: string,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }>;

    abstract getRejectInfo(idUsulanSaluran: number): Promise<Record<string, unknown> | null>;

    abstract findById(
        id: number,
        userIdOpd: number | null,
        userRoles: Role[],
    ): Promise<Record<string, unknown>>;

    abstract findAll(
        query: UsulanSaluranListQuery,
        userIdOpd: number | null,
        userRoles: Role[],
    ): Promise<UsulanSaluranListResult>;

    abstract delete(
        idUsulanSaluran: number,
        userIdOpd: number | null,
        userRoles: Role[],
    ): Promise<boolean>;
}
