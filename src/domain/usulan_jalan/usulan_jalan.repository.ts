import { UsulanJalanWithRelationsDto } from 'src/application/usulan_jalan/dto/usulan_jalan_with_relations.dto';
import { FindAllUsulanJalanDto } from 'src/application/usulan_jalan/dto/find_all_usulan_jalan.dto';
import { RejectInfoDto } from 'src/application/usulan_jalan/dto/reject_info.dto';
import { DeepPartial } from 'typeorm';
import { UsulanJalan } from './usulan_jalan.entity';
import { GetUsulanJalanAnalyticsFilterDto } from 'src/application/usulan_jalan/dto/get_usulan_jalan_analytics_filter.dto';
import { UsulanJalanAnalyticsDto } from 'src/application/usulan_jalan/dto/usulan_jalan_analytics.dto';

export abstract class UsulanJalanRepository {
    abstract findById(id: number, idOpd?: number): Promise<UsulanJalanWithRelationsDto | null>;
    abstract findAll(
        dto: FindAllUsulanJalanDto,
        idOpd?: number,
    ): Promise<{ data: UsulanJalanWithRelationsDto[]; total: number }>;
    abstract getRejectInfo(id: number, idOpd?: number): Promise<RejectInfoDto | null>;
    abstract create(data: DeepPartial<UsulanJalan>): Promise<UsulanJalanWithRelationsDto>;
    abstract update(
        id: number,
        data: DeepPartial<UsulanJalan>,
    ): Promise<UsulanJalanWithRelationsDto>;
    abstract delete(id: number): Promise<void>;
    abstract getAnalytics(
        idOpd?: number,
        filter?: GetUsulanJalanAnalyticsFilterDto,
    ): Promise<UsulanJalanAnalyticsDto>;
}
