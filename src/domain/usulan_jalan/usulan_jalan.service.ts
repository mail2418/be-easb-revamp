import { Role } from '../user/user_role.enum';
import { UsulanJalanWithRelationsDto } from 'src/application/usulan_jalan/dto/usulan_jalan_with_relations.dto';
import { FindAllUsulanJalanDto } from 'src/application/usulan_jalan/dto/find_all_usulan_jalan.dto';
import { UsulanJalanListResultDto } from 'src/application/usulan_jalan/dto/usulan_jalan_list_result.dto';
import { RejectInfoDto } from 'src/application/usulan_jalan/dto/reject_info.dto';
import { StoreInformasiUsulanJalanDto } from 'src/presentation/usulan_jalan/dto/store_informasi_usulan_jalan.dto';
import { UpdateUsulanJalanDto } from 'src/presentation/usulan_jalan/dto/update_usulan_jalan.dto';
import { VerifyInformasiUsulanJalanDto } from 'src/presentation/usulan_jalan/dto/verify_informasi_usulan_jalan.dto';
import { GetUsulanJalanAnalyticsFilterDto } from 'src/application/usulan_jalan/dto/get_usulan_jalan_analytics_filter.dto';
import { UsulanJalanAnalyticsDto } from 'src/application/usulan_jalan/dto/usulan_jalan_analytics.dto';
import { CreateUsulanJalanStoreIndexDto } from 'src/application/usulan_jalan/dto/create_usulan_jalan_store_index.dto';
import { UpdateUsulanJalanStoreIndexDto } from 'src/application/usulan_jalan/dto/update_usulan_jalan_store_index.dto';
import { VerifyIndexUsulanJalanDto } from 'src/presentation/usulan_jalan/dto/verify_index_usulan_jalan.dto';
import { VerifyUsulanJalanDto } from 'src/presentation/usulan_jalan/dto/verify_usulan_jalan.dto';
import { VerifyBpkadUsulanJalanDto } from 'src/presentation/usulan_jalan/dto/verify_bpkad_usulan_jalan.dto';

export abstract class UsulanJalanService {
    // Query methods
    abstract findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<UsulanJalanWithRelationsDto | null>;
    abstract findAll(dto: FindAllUsulanJalanDto, userIdOpd: number | null, userRoles: Role[]): Promise<UsulanJalanListResultDto>;

    // Index CRUD operations (SUPERADMIN, ADMIN, OPD)  
    abstract createIndex(dto: CreateUsulanJalanStoreIndexDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract updateIndex(dto: UpdateUsulanJalanStoreIndexDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;

    // CRUD operations (SUPERADMIN, ADMIN, OPD)
    abstract storeInformasi(dto: StoreInformasiUsulanJalanDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract updateUsulanJalan(dto: UpdateUsulanJalanDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract deleteUsulanJalan(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number }>;

    // Verification operations (SUPERADMIN, ADMIN, VERIFIKATOR)
    abstract verifyIndex(dto: VerifyIndexUsulanJalanDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract verifyInformasi(dto: VerifyInformasiUsulanJalanDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;

    // Final approval/rejection by specific verificators
    abstract verifyAdbang(id: number, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract verifyBpkad(dto: VerifyBpkadUsulanJalanDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract verifyBappeda(id: number, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;

    abstract reject(id: number, rejectReason: string, userId: string, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract getRejectInfo(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<RejectInfoDto | null>;
    abstract getAnalytics(userIdOpd: number | null, userRoles: Role[], filter?: GetUsulanJalanAnalyticsFilterDto): Promise<UsulanJalanAnalyticsDto>;
}
