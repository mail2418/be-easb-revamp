import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        try {
            const ormEntity = plainToInstance(AsbFungsiRuangOrmEntity, asbFungsiRuang);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, asbFungsiRuang: Partial<AsbFungsiRuang>): Promise<AsbFungsiRuang> {
        try {
            await this.repo.update(id, asbFungsiRuang);
            const updatedEntity = await this.repo.findOne({ where: { id } });
            return updatedEntity!;
        } catch (error) {
            throw error;
        }
    }
    
    async delete(id: number): Promise<boolean> {
        try {
            return await this.repo.softDelete(id).then(() => true).catch(() => false);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbFungsiRuang | null> {
        try {
            const entity = await this.repo
                .createQueryBuilder('asb_fungsi_ruang')
                .select(['asb_fungsi_ruang.id', 'asb_fungsi_ruang.nama_fungsi_ruang', 'asb_fungsi_ruang.koef'])
                .where('asb_fungsi_ruang.id = :id', { id })
                .getOne();
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbFungsiRuangsDto): Promise<{ data: AsbFungsiRuang[]; total: number }> {
        try {
            const page = pagination.page ?? 1;
            const amount = pagination.amount ?? 10;
            const [data, total] = await this.repo.findAndCount({
                skip: (page - 1) * amount,
                take: amount,
                order: { id: 'DESC' }
            });

            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async findByNama(nama: string): Promise<AsbFungsiRuang | null> {
        try {
            const entity = await this.repo.findOne({ where: { nama_fungsi_ruang: nama } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}
