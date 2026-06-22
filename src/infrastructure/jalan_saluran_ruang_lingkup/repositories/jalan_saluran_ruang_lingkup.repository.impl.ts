import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationQueryDto } from '../../../common/dto/pagination_query.dto';
import { applyIlikeSearch } from '../../../common/utils/search_query.util';
import { JalanSaluranRuangLingkupRepository } from '../../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.repository';
import { JalanSaluranRuangLingkupOrmEntity } from '../orm/jalan_saluran_ruang_lingkup.orm_entity';
import { CreateJalanSaluranRuangLingkupDto } from '../../../presentation/jalan_saluran_ruang_lingkup/dto/create_jalan_saluran_ruang_lingkup.dto';
import { UpdateJalanSaluranRuangLingkupDto } from '../../../presentation/jalan_saluran_ruang_lingkup/dto/update_jalan_saluran_ruang_lingkup.dto';

@Injectable()
export class JalanSaluranRuangLingkupRepositoryImpl implements JalanSaluranRuangLingkupRepository {
    constructor(@InjectRepository(JalanSaluranRuangLingkupOrmEntity) private readonly repo: Repository<JalanSaluranRuangLingkupOrmEntity>) {}
    async create(dto: CreateJalanSaluranRuangLingkupDto) { const saved = await this.repo.save(plainToInstance(JalanSaluranRuangLingkupOrmEntity, dto)); return this.findById(saved.id) as Promise<any>; }
    async update(dto: UpdateJalanSaluranRuangLingkupDto) { const { id, ...rest } = dto; await this.repo.update(id, rest); return (await this.findById(id))!; }
    async delete(id: number) { await this.repo.softDelete(id); return true; }
    async findById(id: number) { return this.repo.findOne({ where: { id }, relations: ['jenisUsulan'] }); }
    async findAll(pagination: PaginationQueryDto) {
        const qb = this.repo.createQueryBuilder('item').leftJoinAndSelect('item.jenisUsulan', 'jenisUsulan');
        applyIlikeSearch(qb, 'item', ['deskripsi_ruang_lingkup'], pagination.search);
        const [data, total] = await qb.orderBy('item.id','DESC').skip((pagination.page-1)*pagination.amount).take(pagination.amount).getManyAndCount();
        return { data, total };
    }
}