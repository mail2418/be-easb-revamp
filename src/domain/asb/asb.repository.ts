import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';
import { FindAllAsbDto } from 'src/application/asb/dto/find_all_asb.dto';
import { DeepPartial } from 'typeorm';
import { Asb } from './asb.entity';
import { GetAsbByMonthYearDto } from 'src/application/asb/dto/get_asb_by_moth_year.dto';
import { AsbAnalyticsDto } from 'src/application/asb/dto/asb_analytics.dto';
import { GetAsbAnalyticsFilterDto } from 'src/application/asb/dto/get_asb_analytics_filter.dto';
import { RejectInfoDto } from 'src/application/asb/dto/reject_info.dto';

export abstract class AsbRepository {
    abstract findById(id: number, idOpd?: number): Promise<AsbWithRelationsDto | null>;
    abstract findAll(
        dto: FindAllAsbDto,
        idOpd?: number,
    ): Promise<{ data: AsbWithRelationsDto[]; total: number }>;
    abstract getAllByMonthYear(
        dto: GetAsbByMonthYearDto,
        idOpd?: number,
    ): Promise<{ date: string; count: number }[]>;
    abstract getAsbStatusCountsByMonthYear(
        dto: GetAsbByMonthYearDto,
        idOpd?: number,
    ): Promise<{ idAsbStatus: number; count: number }[]>;
    abstract getAsbAnalytics(
        idOpd?: number,
        filter?: GetAsbAnalyticsFilterDto,
    ): Promise<AsbAnalyticsDto>;
    abstract getRejectInfo(id: number, idOpd?: number): Promise<RejectInfoDto | null>;
    abstract create(data: DeepPartial<Asb>): Promise<AsbWithRelationsDto>;
    abstract update(id: number, data: DeepPartial<Asb>): Promise<AsbWithRelationsDto>;
    abstract delete(id: number): Promise<void>;
}
