import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import {
    UsulanSaluranRepository,
    UsulanSaluranListQuery,
    UsulanSaluranListResult,
} from '../../../domain/usulan_saluran/usulan_saluran.repository';
import { UsulanSaluranOrmEntity } from '../orm/usulan_saluran.orm_entity';

const RELATIONS = [
    'opd',
    'usulanSaluranStatus',
    'asbJenis',
    'tipeSaluran',
    'rekening',
    'rekeningReview',
    'kabkota',
    'kecamatan',
    'kelurahan',
    'verifikatorAdbang',
    'verifikatorAdbang.user',
    'verifikatorBpkad',
    'verifikatorBpkad.user',
    'verifikatorBappeda',
    'verifikatorBappeda.user',
    'rejectVerifikator',
] as const;

@Injectable()
export class UsulanSaluranRepositoryImpl implements UsulanSaluranRepository {
    constructor(
        @InjectRepository(UsulanSaluranOrmEntity)
        private readonly repo: Repository<UsulanSaluranOrmEntity>,
    ) {}

    private toDto(entity: UsulanSaluranOrmEntity): Record<string, unknown> {
        const rejectVerifikator = entity.rejectVerifikator
            ? { id: entity.rejectVerifikator.id, username: (entity.rejectVerifikator as { username?: string }).username }
            : null;

        return {
            ...entity,
            rejectVerifikator,
        };
    }

    async create(data: Record<string, unknown>): Promise<{ id: number }> {
        const entity = this.repo.create(data as Partial<UsulanSaluranOrmEntity>);
        const saved = await this.repo.save(entity);
        return { id: saved.id };
    }

    async update(id: number, data: Record<string, unknown>): Promise<{ id: number; idUsulanSaluranStatus: number }> {
        await this.repo.update(id, data as Parameters<Repository<UsulanSaluranOrmEntity>['update']>[1]);
        const updated = await this.repo.findOne({ where: { id } });
        return { id, idUsulanSaluranStatus: updated?.idUsulanSaluranStatus ?? 0 };
    }

    async softDelete(id: number): Promise<boolean> {
        const result = await this.repo.softDelete(id);
        return (result.affected ?? 0) > 0;
    }

    async findById(id: number, idOpd?: number | null): Promise<Record<string, unknown> | null> {
        const where: { id: number; idOpd?: number } = { id };
        if (idOpd) {
            where.idOpd = idOpd;
        }

        const entity = await this.repo.findOne({ where, relations: [...RELATIONS] });
        return entity ? this.toDto(entity) : null;
    }

    async findAll(query: UsulanSaluranListQuery, idOpd?: number | null): Promise<UsulanSaluranListResult> {
        const page = query.page ?? 1;
        const amount = query.amount ?? 10;
        const where: Record<string, unknown> = {};

        if (idOpd) where.idOpd = idOpd;
        if (query.tahunAnggaran) where.tahunAnggaran = query.tahunAnggaran;
        if (query.idUsulanSaluranStatus) where.idUsulanSaluranStatus = query.idUsulanSaluranStatus;
        if (query.idKabkota) where.idKabkota = query.idKabkota;
        if (query.idKecamatan) where.idKecamatan = query.idKecamatan;
        if (query.idKelurahan) where.idKelurahan = query.idKelurahan;
        if (query.idTipeSaluran) where.idTipeSaluran = query.idTipeSaluran;
        if (query.namaUsulanSaluran) where.namaUsulan = ILike(`%${query.namaUsulanSaluran}%`);

        const [entities, total] = await this.repo.findAndCount({
            where,
            relations: [...RELATIONS],
            skip: (page - 1) * amount,
            take: amount,
            order: { createdAt: 'DESC' },
        });

        return {
            data: entities.map((e) => this.toDto(e)),
            total,
            totalPages: Math.ceil(total / amount) || 1,
            page,
        };
    }
}
