import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { JenisStandarRepository } from '../../../domain/jenis_standar/jenis_standar.repository';
import { JenisStandar } from '../../../domain/jenis_standar/jenis_standar.entity';
import { JenisStandarOrmEntity } from '../orm/jenis_standar.orm_entity';
import { CreateJenisStandarDto } from '../../../presentation/jenis_standar/dto/create_jenis_standar.dto';
import { UpdateJenisStandarDto } from '../../../presentation/jenis_standar/dto/update_jenis_standar.dto';
import { GetJenisStandarDto } from '../../../presentation/jenis_standar/dto/get_jenis_standar.dto';

import { plainToInstance } from 'class-transformer';

@Injectable()
export class JenisStandarRepositoryImpl implements JenisStandarRepository {
    constructor(
        @InjectRepository(JenisStandarOrmEntity)
        private readonly repo: Repository<JenisStandarOrmEntity>,
    ) {}

    async create(dto: CreateJenisStandarDto): Promise<JenisStandar> {
        const ormEntity = plainToInstance(JenisStandarOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateJenisStandarDto): Promise<JenisStandar> {
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

    async findById(id: number): Promise<JenisStandar | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findByJenis(jenis: string): Promise<JenisStandar | null> {
        const entity = await this.repo
            .createQueryBuilder('jenis_standar')
            .where('jenis_standar.jenis ILIKE :jenis', { jenis: `%${jenis}%` })
            .getOne();
        return entity || null;
    }

    async findAll(dto: GetJenisStandarDto): Promise<{ data: JenisStandar[]; total: number }> {
        const findOptions: any = {
            order: { id: 'DESC' },
        };

        if (dto.search) {
            findOptions.where = { jenis: ILike(`%${dto.search}%`) };
        }

        if (dto.page !== undefined && dto.amount !== undefined) {
            findOptions.skip = (dto.page - 1) * dto.amount;
            findOptions.take = dto.amount;
        }

        const [data, total] = await this.repo.findAndCount(findOptions);

        return { data, total };
    }
}
