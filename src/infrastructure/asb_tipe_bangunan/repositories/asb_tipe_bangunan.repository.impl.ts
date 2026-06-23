import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AsbTipeBangunanRepository } from '../../../domain/asb_tipe_bangunan/asb_tipe_bangunan.repository';
import { AsbTipeBangunan } from '../../../domain/asb_tipe_bangunan/asb_tipe_bangunan.entity';
import { AsbTipeBangunanOrmEntity } from '../orm/asb_tipe_bangunan.orm_entity';
import { CreateAsbTipeBangunanDto } from '../../../presentation/asb_tipe_bangunan/dto/create_asb_tipe_bangunan.dto';
import { UpdateAsbTipeBangunanDto } from '../../../presentation/asb_tipe_bangunan/dto/update_asb_tipe_bangunan.dto';
import { GetAsbTipeBangunanDto } from '../../../presentation/asb_tipe_bangunan/dto/get_asb_tipe_bangunan.dto';

import { plainToInstance } from 'class-transformer';

@Injectable()
export class AsbTipeBangunanRepositoryImpl implements AsbTipeBangunanRepository {
    constructor(
        @InjectRepository(AsbTipeBangunanOrmEntity)
        private readonly repo: Repository<AsbTipeBangunanOrmEntity>,
    ) {}

    async create(dto: CreateAsbTipeBangunanDto): Promise<AsbTipeBangunan> {
        const ormEntity = plainToInstance(AsbTipeBangunanOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateAsbTipeBangunanDto): Promise<AsbTipeBangunan> {
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

    async findById(id: number): Promise<AsbTipeBangunan | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findByTipeBangunan(tipe_bangunan: string): Promise<AsbTipeBangunan | null> {
        const entity = await this.repo.findOne({ where: { tipe_bangunan } });
        return entity || null;
    }

    async findAll(dto: GetAsbTipeBangunanDto): Promise<{ data: AsbTipeBangunan[]; total: number }> {
        const findOptions: any = {
            order: { id: 'DESC' },
        };

        if (dto.search) {
            findOptions.where = { tipe_bangunan: ILike(`%${dto.search}%`) };
        }

        if (dto.page !== undefined && dto.amount !== undefined) {
            findOptions.skip = (dto.page - 1) * dto.amount;
            findOptions.take = dto.amount;
        }

        const [data, total] = await this.repo.findAndCount(findOptions);

        return { data, total };
    }
}
