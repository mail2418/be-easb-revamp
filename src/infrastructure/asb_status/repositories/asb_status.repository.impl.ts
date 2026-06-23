import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AsbStatusRepository } from '../../../domain/asb_status/asb_status.repository';
import { AsbStatus } from '../../../domain/asb_status/asb_status.entity';
import { AsbStatusOrmEntity } from '../orm/asb_status.orm_entity';
import { CreateAsbStatusDto } from '../../../presentation/asb_status/dto/create_asb_status.dto';
import { UpdateAsbStatusDto } from '../../../presentation/asb_status/dto/update_asb_status.dto';
import { GetAsbStatusDto } from '../../../presentation/asb_status/dto/get_asb_status.dto';

import { plainToInstance } from 'class-transformer';

@Injectable()
export class AsbStatusRepositoryImpl implements AsbStatusRepository {
    constructor(
        @InjectRepository(AsbStatusOrmEntity) private readonly repo: Repository<AsbStatusOrmEntity>,
    ) {}

    async create(dto: CreateAsbStatusDto): Promise<AsbStatus> {
        const ormEntity = plainToInstance(AsbStatusOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateAsbStatusDto): Promise<AsbStatus> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo
            .softDelete(id)
            .then(() => true)
            .catch(() => false);
    }

    async findById(id: number): Promise<AsbStatus | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findByStatus(status: string): Promise<AsbStatus | null> {
        const entity = await this.repo
            .createQueryBuilder('asb_status')
            .where('asb_status.status ILIKE :status', { status: `%${status}%` })
            .getOne();
        return entity || null;
    }

    async findAll(dto: GetAsbStatusDto): Promise<{ data: AsbStatus[]; total: number }> {
        const findOptions: any = {
            order: { id: 'DESC' },
        };

        if (dto.search) {
            findOptions.where = { status: ILike(`%${dto.search}%`) };
        }

        if (dto.page !== undefined && dto.amount !== undefined) {
            findOptions.skip = (dto.page - 1) * dto.amount;
            findOptions.take = dto.amount;
        }

        const [data, total] = await this.repo.findAndCount(findOptions);

        return { data, total };
    }
}
