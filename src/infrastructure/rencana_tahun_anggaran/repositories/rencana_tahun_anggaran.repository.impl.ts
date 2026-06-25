import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RencanaTahunAnggaranRepository } from '../../../domain/rencana_tahun_anggaran/rencana_tahun_anggaran.repository';
import { RencanaTahunAnggaran } from '../../../domain/rencana_tahun_anggaran/rencana_tahun_anggaran.entity';
import { RencanaTahunAnggaranOrmEntity } from '../orm/rencana_tahun_anggaran.orm_entity';
import { CreateRencanaTahunAnggaranDto } from '../../../presentation/rencana_tahun_anggaran/dto/create_rencana_tahun_anggaran.dto';
import { GetRencanaTahunAnggaransDto } from '../../../presentation/rencana_tahun_anggaran/dto/get_rencana_tahun_anggarans.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RencanaTahunAnggaranRepositoryImpl implements RencanaTahunAnggaranRepository {
    constructor(
        @InjectRepository(RencanaTahunAnggaranOrmEntity)
        private readonly repo: Repository<RencanaTahunAnggaranOrmEntity>,
    ) {}

    async create(dto: CreateRencanaTahunAnggaranDto): Promise<RencanaTahunAnggaran> {
        const entity = plainToInstance(RencanaTahunAnggaranOrmEntity, dto);
        return await this.repo.save(entity);
    }

    async update(id: number, data: Partial<RencanaTahunAnggaran>): Promise<RencanaTahunAnggaran> {
        await this.repo.update(id, data);
        const updated = await this.repo.findOne({ where: { id } });
        return updated!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo
            .softDelete(id)
            .then(() => true)
            .catch(() => false);
    }

    async findById(id: number): Promise<RencanaTahunAnggaran | null> {
        const row = await this.repo.findOne({ where: { id } });
        return row || null;
    }

    async findByTahun(tahun: number): Promise<RencanaTahunAnggaran | null> {
        const row = await this.repo.findOne({ where: { tahun } });
        return row || null;
    }

    async findAll(
        pagination: GetRencanaTahunAnggaransDto,
    ): Promise<{ data: RencanaTahunAnggaran[]; total: number }> {
        const findOptions: {
            where?: { isActive?: boolean };
            order: { tahun: 'DESC' };
            skip?: number;
            take?: number;
        } = {
            order: { tahun: 'DESC' },
        };

        if (pagination.isActive !== undefined) {
            findOptions.where = { isActive: pagination.isActive };
        }

        if (pagination.page !== undefined && pagination.amount !== undefined) {
            findOptions.skip = (pagination.page - 1) * pagination.amount;
            findOptions.take = pagination.amount;
        }

        const [rows, total] = await this.repo.findAndCount(findOptions);
        return { data: rows, total };
    }
}
