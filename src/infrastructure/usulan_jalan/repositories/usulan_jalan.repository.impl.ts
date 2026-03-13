import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsulanJalanRepository } from '../../../domain/usulan_jalan/usulan_jalan.repository';
import { UsulanJalanOrmEntity } from '../orm/usulan_jalan.orm_entity';
import { UsulanJalan } from 'src/domain/usulan_jalan/usulan_jalan.entity';

@Injectable()
export class UsulanJalanRepositoryImpl implements UsulanJalanRepository {
    constructor(
        @InjectRepository(UsulanJalanOrmEntity)
        private readonly repo: Repository<UsulanJalanOrmEntity>,
    ) {}

    async create(data: Partial<UsulanJalanOrmEntity>): Promise<UsulanJalan> {
        const entity = this.repo.create(data);
        return await this.repo.save(entity);
    }

    async update(id: number, usulan: Partial<UsulanJalanOrmEntity>): Promise<UsulanJalan> {
        await this.repo.update(id, usulan);
        const updated = await this.findById(id);
        if (!updated) throw new NotFoundException('Usulan jalan tidak ditemukan');
        return updated;
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repo.softDelete(id);
        return result.affected ? true : false;
    }

    async findById(id: number): Promise<UsulanJalan | null> {
        return this.repo.findOne({ where: { id } });
    }

    async findAll(page: number, limit: number): Promise<{ data: UsulanJalan[]; total: number }> {
        const [data, total] = await this.repo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { id: 'DESC' },
        });
        return { data, total };
    }
}
