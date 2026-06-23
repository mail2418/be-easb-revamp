import { UsulanSaluranWithRelationsDto } from 'src/application/usulan_saluran/dto/usulan_saluran_with_relations.dto';
import { FindAllUsulanSaluranDto } from 'src/application/usulan_saluran/dto/find_all_usulan_saluran.dto';
import { RejectInfoSaluranDto } from 'src/application/usulan_saluran/dto/reject_info.dto';
import { DeepPartial } from 'typeorm';
import { UsulanSaluran } from './usulan_saluran.entity';
import { GetUsulanSaluranAnalyticsFilterDto } from 'src/application/usulan_saluran/dto/get_usulan_saluran_analytics_filter.dto';
import { UsulanSaluranAnalyticsDto } from 'src/application/usulan_saluran/dto/usulan_saluran_analytics.dto';

export abstract class UsulanSaluranRepository {
    abstract findById(id: number, idOpd?: number): Promise<UsulanSaluranWithRelationsDto | null>;
    abstract findAll(
        dto: FindAllUsulanSaluranDto,
        idOpd?: number,
    ): Promise<{ data: UsulanSaluranWithRelationsDto[]; total: number }>;
    abstract getRejectInfo(id: number, idOpd?: number): Promise<RejectInfoSaluranDto | null>;
    abstract create(data: DeepPartial<UsulanSaluran>): Promise<UsulanSaluranWithRelationsDto>;
    abstract update(
        id: number,
        data: DeepPartial<UsulanSaluran>,
    ): Promise<UsulanSaluranWithRelationsDto>;
    abstract delete(id: number): Promise<void>;
    abstract getAnalytics(
        idOpd?: number,
        filter?: GetUsulanSaluranAnalyticsFilterDto,
    ): Promise<UsulanSaluranAnalyticsDto>;
}
