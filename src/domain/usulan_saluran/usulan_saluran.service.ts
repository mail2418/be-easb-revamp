import { Role } from '../user/user_role.enum';
import { UsulanSaluranWithRelationsDto } from 'src/application/usulan_saluran/dto/usulan_saluran_with_relations.dto';
import { FindAllUsulanSaluranDto } from 'src/application/usulan_saluran/dto/find_all_usulan_saluran.dto';
import { UsulanSaluranListResultDto } from 'src/application/usulan_saluran/dto/usulan_saluran_list_result.dto';
import { RejectInfoSaluranDto } from 'src/application/usulan_saluran/dto/reject_info.dto';
import { StoreInformasiUsulanSaluranDto } from 'src/presentation/usulan_saluran/dto/store_informasi_usulan_saluran.dto';
import { UpdateUsulanSaluranDto } from 'src/presentation/usulan_saluran/dto/update_usulan_saluran.dto';
import { VerifyInformasiUsulanSaluranDto } from 'src/presentation/usulan_saluran/dto/verify_informasi_usulan_saluran.dto';
import { GetUsulanSaluranAnalyticsFilterDto } from 'src/application/usulan_saluran/dto/get_usulan_saluran_analytics_filter.dto';
import { UsulanSaluranAnalyticsDto } from 'src/application/usulan_saluran/dto/usulan_saluran_analytics.dto';
import { CreateUsulanSaluranStoreIndexDto } from 'src/application/usulan_saluran/dto/create_usulan_saluran_store_index.dto';
import { UpdateUsulanSaluranStoreIndexDto } from 'src/application/usulan_saluran/dto/update_usulan_saluran_store_index.dto';
import { VerifyIndexUsulanSaluranDto } from 'src/presentation/usulan_saluran/dto/verify_index_usulan_saluran.dto';
import { VerifyBpkadUsulanSaluranDto } from 'src/presentation/usulan_saluran/dto/verify_bpkad_usulan_saluran.dto';

export abstract class UsulanSaluranService {
    abstract findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<UsulanSaluranWithRelationsDto | null>;
    abstract findAll(dto: FindAllUsulanSaluranDto, userIdOpd: number | null, userRoles: Role[]): Promise<UsulanSaluranListResultDto>;

    abstract createIndex(dto: CreateUsulanSaluranStoreIndexDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract updateIndex(dto: UpdateUsulanSaluranStoreIndexDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;

    abstract storeInformasi(dto: StoreInformasiUsulanSaluranDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract updateUsulanSaluran(dto: UpdateUsulanSaluranDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract deleteUsulanSaluran(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number }>;

    abstract verifyIndex(dto: VerifyIndexUsulanSaluranDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract verifyInformasi(dto: VerifyInformasiUsulanSaluranDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;

    abstract verifyAdbang(id: number, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract verifyBpkad(dto: VerifyBpkadUsulanSaluranDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract verifyBappeda(id: number, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;

    abstract reject(id: number, rejectReason: string, userId: string, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract getRejectInfo(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<RejectInfoSaluranDto | null>;
    abstract getAnalytics(userIdOpd: number | null, userRoles: Role[], filter?: GetUsulanSaluranAnalyticsFilterDto): Promise<UsulanSaluranAnalyticsDto>;
}
