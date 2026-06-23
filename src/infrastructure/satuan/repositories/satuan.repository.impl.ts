import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SatuanRepository } from '../../../domain/satuan/satuan.repository';
import { Satuan } from '../../../domain/satuan/satuan.entity';
import { SatuanOrmEntity } from '../orm/satuan.orm_entity';
import { CreateSatuanDto } from '../../../presentation/satuan/dto/create_satuan.dto';
import { GetSatuansDto } from '../../../presentation/satuan/dto/get_satuans.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SatuanRepositoryImpl implements SatuanRepository {
    constructor(
        @InjectRepository(SatuanOrmEntity) private readonly repo: Repository<SatuanOrmEntity>,
    ) {}

    async create(satuan: CreateSatuanDto): Promise<Satuan> {
        const satuanOrm = plainToInstance(SatuanOrmEntity, satuan);
        const newSatuan = await this.repo.save(satuanOrm);
        return newSatuan;
    }

    async update(id: number, data: Partial<Satuan>): Promise<Satuan> {
        await this.repo.update(id, data);
        const updatedSatuan = await this.repo.findOne({ where: { id } });
        return updatedSatuan!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo
            .softDelete(id)
            .then(() => true)
            .catch(() => false);
    }

    async findById(id: number): Promise<Satuan | null> {
        const satuan = await this.repo.findOne({ where: { id } });
        return satuan || null;
    }

    async findBySatuan(satuan: string): Promise<Satuan | null> {
        const satuanData = await this.repo.findOne({ where: { satuan } });
        return satuanData || null;
    }

    async findAll(pagination: GetSatuansDto): Promise<{ data: Satuan[]; total: number }> {
        const findOptions: any = {
            order: { id: 'DESC' },
        };

        if (pagination.search) {
            findOptions.where = { satuan: ILike(`%${pagination.search}%`) };
        }

        if (pagination.page !== undefined && pagination.amount !== undefined) {
            findOptions.skip = (pagination.page - 1) * pagination.amount;
            findOptions.take = pagination.amount;
        }

        const [satuans, total] = await this.repo.findAndCount(findOptions);

        return { data: satuans, total };
    }
}
