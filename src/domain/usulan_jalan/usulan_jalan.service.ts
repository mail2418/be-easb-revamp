import { Role } from '../user/user_role.enum';
import { UsulanJalanListQuery, UsulanJalanListResult } from './usulan_jalan.repository';

export abstract class UsulanJalanService {
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
    ): Promise<{ id: number; idUsulanJalanStatus: number }>;

    abstract verifyIndex(
        dto: Record<string, unknown>,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }>;

    abstract verifyInformasi(
        dto: Record<string, unknown>,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }>;

    abstract verifyAdbang(
        idUsulanJalan: number,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }>;

    abstract verifyBpkad(
        dto: Record<string, unknown>,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }>;

    abstract verifyBappeda(
        idUsulanJalan: number,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }>;

    abstract reject(
        idUsulanJalan: number,
        rejectReason: string,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }>;

    abstract getRejectInfo(idUsulanJalan: number): Promise<Record<string, unknown> | null>;

    abstract findById(
        id: number,
        userIdOpd: number | null,
        userRoles: Role[],
    ): Promise<Record<string, unknown>>;

    abstract findAll(
        query: UsulanJalanListQuery,
        userIdOpd: number | null,
        userRoles: Role[],
    ): Promise<UsulanJalanListResult>;

    abstract delete(
        idUsulanJalan: number,
        userIdOpd: number | null,
        userRoles: Role[],
    ): Promise<boolean>;
}
