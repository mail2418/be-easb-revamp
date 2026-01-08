import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpdRepository } from '../../../domain/opd/opd.repository';
import { Opd } from '../../../domain/opd/opd.entity';
import { OpdOrmEntity } from '../orm/opd.orm_entity';
import { CreateOpdDto } from '../../../presentation/opd/dto/create_opd.dto';
import { UpdateOpdDto } from '../../../presentation/opd/dto/update_opd.dto';
import { DeleteOpdDto } from '../../../presentation/opd/dto/delete_opd.dto';
import { GetOpdsDto } from '../../../presentation/opd/dto/get_opds.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OpdRepositoryImpl implements OpdRepository {
    constructor(@InjectRepository(OpdOrmEntity) private readonly repo: Repository<OpdOrmEntity>) {}

    async create(dto: CreateOpdDto): Promise<Opd> {
        const ormEntity = plainToInstance(OpdOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateOpdDto): Promise<Opd> {
        await this.repo.update(dto.id, dto);
        const updatedEntity = await this.repo.findOne({ where: { id: dto.id } });
        return updatedEntity!;
    }
    
    async delete(dto: DeleteOpdDto): Promise<boolean> {
        return await this.repo.softDelete(dto.id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<Opd | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findAll(pagination: GetOpdsDto): Promise<{ data: Opd[]; total: number }> {
        const findOptions: any = {
            order: { id: 'DESC' }
        };

        if (pagination.page !== undefined && pagination.amount !== undefined) {
            findOptions.skip = (pagination.page - 1) * pagination.amount;
            findOptions.take = pagination.amount;
        }

        const [data, total] = await this.repo.findAndCount(findOptions);

        return { data, total };
    }

    async getOpdByUser(id_user: number): Promise<Opd | null> {
        const entity = await this.repo
            .createQueryBuilder('opd')
            .where('opd.id_user = :id_user', { id_user })
            .getOne();
        return entity || null;
    }
}
