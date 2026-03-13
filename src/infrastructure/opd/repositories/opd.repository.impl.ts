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
        try {
            const ormEntity = plainToInstance(OpdOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateOpdDto): Promise<Opd> {
        try {
            await this.repo.update(dto.id, dto);
            const updatedEntity = await this.repo.findOne({ where: { id: dto.id } });
            return updatedEntity!;
        } catch (error) {
            throw error;
        }
    }
    
    async delete(dto: DeleteOpdDto): Promise<boolean> {
        try {
            return await this.repo.softDelete(dto.id).then(() => true).catch(() => false);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Opd | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetOpdsDto): Promise<{ data: Opd[]; total: number }> {
        try {
            const [data, total] = await this.repo.findAndCount({
                skip: (pagination.page - 1) * pagination.amount,
                take: pagination.amount,
                order: { id: 'DESC' }
            });

            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async getOpdByUser(id_user: number): Promise<Opd | null> {
        try {
            const entity = await this.repo
                .createQueryBuilder('opd')
                .where('opd.id_user = :id_user', { id_user })
                .getOne();
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}
