import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { applyIlikeSearch } from '../../../common/utils/search_query.util';
import { HspkRepository } from '../../../domain/hspk/hspk.repository';
import { HspkOrmEntity } from '../orm/hspk.orm_entity';
import { GetHspksDto } from '../../../presentation/hspk/dto/get_hspks.dto';
import { CreateHspkDto } from '../../../presentation/hspk/dto/create_hspk.dto';
import { UpdateHspkDto } from '../../../presentation/hspk/dto/update_hspk.dto';

@Injectable()
export class HspkRepositoryImpl implements HspkRepository {
    constructor(
        @InjectRepository(HspkOrmEntity)
        private readonly repo: Repository<HspkOrmEntity>,
    ) {}

    async create(dto: CreateHspkDto, tahunAnggaran: number) {
        const entity = this.repo.create({ ...dto, tahun_anggaran: tahunAnggaran });
        return this.repo.save(entity);
    }

    async update(dto: UpdateHspkDto) {
        const { id, ...rest } = dto;
        await this.repo.update(id, rest);
        return (await this.repo.findOne({ where: { id } }))!;
    }

    async delete(id: number) {
        await this.repo.softDelete(id);
        return true;
    }

    async findById(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    async findAll(pagination: GetHspksDto) {
        const qb = this.repo.createQueryBuilder('hspk');
        if (pagination.tahun_anggaran) {
            qb.andWhere('hspk.tahun_anggaran = :tahun', { tahun: pagination.tahun_anggaran });
        }
        applyIlikeSearch(qb, 'hspk', ['no_mata_pembayaran', 'satuan', 'uraian'], pagination.search);
        const [data, total] = await qb
            .orderBy('hspk.id', 'DESC')
            .skip((pagination.page - 1) * pagination.amount)
            .take(pagination.amount)
            .getManyAndCount();
        return { data, total };
    }

    async findByRuangLingkup(idRuangLingkup: number) {
        return this.repo.find({
            where: { id_ruang_lingkup: idRuangLingkup },
            order: { id: 'DESC' },
        });
    }

    async bulkCreate(rows: Array<CreateHspkDto & { tahun_anggaran: number }>) {
        const entities = rows.map((row) => this.repo.create(row));
        await this.repo.save(entities);
        return entities.length;
    }
}
