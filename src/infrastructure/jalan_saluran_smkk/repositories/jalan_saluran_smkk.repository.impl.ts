import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationQueryDto } from '../../../common/dto/pagination_query.dto';
import { applyIlikeSearch } from '../../../common/utils/search_query.util';
import { JalanSaluranSmkkRepository } from '../../../domain/jalan_saluran_smkk/jalan_saluran_smkk.repository';
import { JalanSaluranSmkkOrmEntity } from '../orm/jalan_saluran_smkk.orm_entity';
import { CreateJalanSaluranSmkkDto } from '../../../presentation/jalan_saluran_smkk/dto/create_jalan_saluran_smkk.dto';
import { UpdateJalanSaluranSmkkDto } from '../../../presentation/jalan_saluran_smkk/dto/update_jalan_saluran_smkk.dto';

@Injectable()
export class JalanSaluranSmkkRepositoryImpl implements JalanSaluranSmkkRepository {
    constructor(@InjectRepository(JalanSaluranSmkkOrmEntity) private readonly repo: Repository<JalanSaluranSmkkOrmEntity>) {}
    async create(dto: CreateJalanSaluranSmkkDto) { const saved = await this.repo.save(plainToInstance(JalanSaluranSmkkOrmEntity, dto)); return (await this.findById(saved.id))!; }
    async update(dto: UpdateJalanSaluranSmkkDto) { const { id, ...rest } = dto; await this.repo.update(id, rest); return (await this.findById(id))!; }
    async delete(id: number) { await this.repo.softDelete(id); return true; }
    async findById(id: number) { return this.repo.findOne({ where: { id }, relations: ['jenisUsulan'] }); }
    async findAll(pagination: PaginationQueryDto) {
        const qb = this.repo.createQueryBuilder('item').leftJoinAndSelect('item.jenisUsulan', 'jenisUsulan');
        applyIlikeSearch(qb, 'item', ['no_mata_pembayaran','satuan','uraian'], pagination.search);
        const [data, total] = await qb.orderBy('item.id','DESC').skip((pagination.page-1)*pagination.amount).take(pagination.amount).getManyAndCount();
        return { data, total };
    }
    async findByJenisUsulan(id: number) { return this.repo.find({ where: { id_jenis_usulan: id }, relations: ['jenisUsulan'], order: { id: 'DESC' } }); }
}