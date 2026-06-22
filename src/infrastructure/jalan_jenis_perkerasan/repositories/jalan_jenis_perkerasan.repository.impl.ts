import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationQueryDto } from '../../../common/dto/pagination_query.dto';
import { applyIlikeSearch } from '../../../common/utils/search_query.util';
import { JalanJenisPerkerasanRepository } from '../../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.repository';
import { JalanJenisPerkerasan } from '../../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.entity';
import { JalanJenisPerkerasanOrmEntity } from '../orm/jalan_jenis_perkerasan.orm_entity';
import { CreateJalanJenisPerkerasanDto } from '../../../presentation/jalan_jenis_perkerasan/dto/create_jalan_jenis_perkerasan.dto';
import { UpdateJalanJenisPerkerasanDto } from '../../../presentation/jalan_jenis_perkerasan/dto/update_jalan_jenis_perkerasan.dto';

@Injectable()
export class JalanJenisPerkerasanRepositoryImpl implements JalanJenisPerkerasanRepository {
    constructor(
        @InjectRepository(JalanJenisPerkerasanOrmEntity)
        private readonly repo: Repository<JalanJenisPerkerasanOrmEntity>,
    ) {}

    async create(dto: CreateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan> {
        const entity = plainToInstance(JalanJenisPerkerasanOrmEntity, dto);
        return this.repo.save(entity);
    }

    async update(dto: UpdateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan> {
        const { id, ...rest } = dto;
        await this.repo.update(id, rest);
        return (await this.repo.findOne({ where: { id } }))!;
    }

    async delete(id: number): Promise<boolean> {
        await this.repo.softDelete(id);
        return true;
    }

    async findById(id: number): Promise<JalanJenisPerkerasan | null> {
        return this.repo.findOne({ where: { id } });
    }

    async findAll(pagination: PaginationQueryDto): Promise<{ data: JalanJenisPerkerasan[]; total: number }> {
        const qb = this.repo.createQueryBuilder('item');
        applyIlikeSearch(qb, 'item', ['jenis_perkerasan'], pagination.search);
        const [data, total] = await qb
            .orderBy('item.id', 'DESC')
            .skip((pagination.page - 1) * pagination.amount)
            .take(pagination.amount)
            .getManyAndCount();
        return { data, total };
    }
}
