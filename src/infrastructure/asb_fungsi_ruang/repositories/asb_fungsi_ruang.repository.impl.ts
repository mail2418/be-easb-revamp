import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AsbFungsiRuangRepository } from '../../../domain/asb_fungsi_ruang/asb_fungsi_ruang.repository';
import { AsbFungsiRuang } from '../../../domain/asb_fungsi_ruang/asb_fungsi_ruang.entity';
import { AsbFungsiRuangOrmEntity } from '../orm/asb_fungsi_ruang.orm_entity';
import { CreateAsbFungsiRuangDto } from '../../../presentation/asb_fungsi_ruang/dto/create_asb_fungsi_ruang.dto';
import { GetAsbFungsiRuangsDto } from 'src/presentation/asb_fungsi_ruang/dto/get_asb_fungsi_ruangs.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AsbFungsiRuangRepositoryImpl implements AsbFungsiRuangRepository {
    constructor(@InjectRepository(AsbFungsiRuangOrmEntity) private readonly repo: Repository<AsbFungsiRuangOrmEntity>) {}

    async create(asbFungsiRuang: CreateAsbFungsiRuangDto): Promise<AsbFungsiRuang> {
        const ormEntity = plainToInstance(AsbFungsiRuangOrmEntity, asbFungsiRuang);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(id: number, asbFungsiRuang: Partial<AsbFungsiRuang>): Promise<AsbFungsiRuang> {
        await this.repo.update(id, asbFungsiRuang);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }
    
    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<AsbFungsiRuang | null> {
        const entity = await this.repo
            .createQueryBuilder('asb_fungsi_ruang')
            .select(['asb_fungsi_ruang.id', 'asb_fungsi_ruang.nama_fungsi_ruang', 'asb_fungsi_ruang.koef'])
            .where('asb_fungsi_ruang.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findAll(pagination: GetAsbFungsiRuangsDto): Promise<{ data: AsbFungsiRuang[]; total: number }> {
        const where = pagination.search
            ? { nama_fungsi_ruang: ILike(`%${pagination.search}%`) }
            : undefined;
        const findOptions: any = {
            where,
            order: { id: 'DESC' },
        };
        if (pagination.page !== undefined && pagination.amount !== undefined) {
            findOptions.skip = (pagination.page - 1) * pagination.amount;
            findOptions.take = pagination.amount;
        }
        const [data, total] = await this.repo.findAndCount(findOptions);

        return { data, total };
    }

    async findByNama(nama: string): Promise<AsbFungsiRuang | null> {
        const entity = await this.repo.findOne({ where: { nama_fungsi_ruang: nama } });
        return entity || null;
    }
}
