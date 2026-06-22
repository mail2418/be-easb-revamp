import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsulanJalanRepository, UsulanJalanListQuery, UsulanJalanListResult } from '../../../domain/usulan_jalan/usulan_jalan.repository';
import { UsulanJalanOrmEntity } from '../orm/usulan_jalan.orm_entity';

const RELATIONS = [
    'opd',
    'usulanJalanStatus',
    'asbJenis',
    'jalanJenisPemeliharaan',
    'jalanJenisPerkerasan',
    'jalanJenisPerkerasanReview',
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
export class UsulanJalanRepositoryImpl implements UsulanJalanRepository {
    constructor(
        @InjectRepository(UsulanJalanOrmEntity)
        private readonly repo: Repository<UsulanJalanOrmEntity>,
    ) {}

    private toDto(entity: UsulanJalanOrmEntity): Record<string, unknown> {
        const rejectVerifikator = entity.rejectVerifikator
            ? { id: entity.rejectVerifikator.id, username: (entity.rejectVerifikator as { username?: string }).username }
            : null;

        return {
            ...entity,
            rejectVerifikator,
        };
    }

    async create(data: Record<string, unknown>): Promise<{ id: number }> {
        const entity = this.repo.create(data as Partial<UsulanJalanOrmEntity>);
        const saved = await this.repo.save(entity);
        return { id: saved.id };
    }

    async update(id: number, data: Record<string, unknown>): Promise<{ id: number; idUsulanJalanStatus: number }> {
        await this.repo.update(id, data as Parameters<Repository<UsulanJalanOrmEntity>['update']>[1]);
        const updated = await this.repo.findOne({ where: { id } });
        return { id, idUsulanJalanStatus: updated?.idUsulanJalanStatus ?? 0 };
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

    async findAll(query: UsulanJalanListQuery, idOpd?: number | null): Promise<UsulanJalanListResult> {
        const page = query.page ?? 1;
        const amount = query.amount ?? 10;
        const where: Record<string, unknown> = {};

        if (idOpd) {
            where.idOpd = idOpd;
        }
        if (query.tahunAnggaran) {
            where.tahunAnggaran = query.tahunAnggaran;
        }

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
