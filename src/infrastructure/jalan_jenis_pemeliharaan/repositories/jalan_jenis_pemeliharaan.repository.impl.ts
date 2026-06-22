import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationQueryDto } from '../../../common/dto/pagination_query.dto';
import { applyIlikeSearch } from '../../../common/utils/search_query.util';
import { JalanJenisPemeliharaanRepository } from '../../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.repository';
import { JalanJenisPemeliharaanOrmEntity } from '../orm/jalan_jenis_pemeliharaan.orm_entity';
import { CreateJalanJenisPemeliharaanDto } from '../../../presentation/jalan_jenis_pemeliharaan/dto/create_jalan_jenis_pemeliharaan.dto';
import { UpdateJalanJenisPemeliharaanDto } from '../../../presentation/jalan_jenis_pemeliharaan/dto/update_jalan_jenis_pemeliharaan.dto';

@Injectable()
export class JalanJenisPemeliharaanRepositoryImpl implements JalanJenisPemeliharaanRepository {
    constructor(@InjectRepository(JalanJenisPemeliharaanOrmEntity) private readonly repo: Repository<JalanJenisPemeliharaanOrmEntity>) {}
    async create(dto: CreateJalanJenisPemeliharaanDto) { return this.repo.save(plainToInstance(JalanJenisPemeliharaanOrmEntity, dto)); }
    async update(dto: UpdateJalanJenisPemeliharaanDto) { const { id, ...rest } = dto; await this.repo.update(id, rest); return (await this.repo.findOne({ where: { id } }))!; }
    async delete(id: number) { await this.repo.softDelete(id); return true; }
    async findById(id: number) { return this.repo.findOne({ where: { id } }); }
    async findAll(pagination: PaginationQueryDto) {
        const qb = this.repo.createQueryBuilder('item');
        applyIlikeSearch(qb, 'item', ["tingkat_pemeliharaan","jenis_pemeliharaan","ruang_lingkup","deskripsi"], pagination.search);
        const [data, total] = await qb.orderBy('item.id','DESC').skip((pagination.page-1)*pagination.amount).take(pagination.amount).getManyAndCount();
        return { data, total };
    }
}
