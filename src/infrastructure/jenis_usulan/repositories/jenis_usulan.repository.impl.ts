import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JenisUsulanRepository } from '../../../domain/jenis_usulan/jenis_usulan.repository';
import { JenisUsulanOrmEntity } from '../orm/jenis_usulan.orm_entity';
import { JenisUsulan } from '../../../domain/jenis_usulan/jenis_usulan.entity';
import { CreateJenisUsulanDto } from '../../../presentation/jenis_usulan/dto/create_jenis_usulan.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateJenisUsulanDto } from '../../../presentation/jenis_usulan/dto/update_jenis_usulan.dto';
import { GetJenisUsulanDto } from '../../../presentation/jenis_usulan/dto/get_jenis_usulan.dto';

@Injectable()
export class JenisUsulanRepositoryImpl implements JenisUsulanRepository {
    constructor(
        @InjectRepository(JenisUsulanOrmEntity)
        private readonly repo: Repository<JenisUsulanOrmEntity>,
    ) {}

    async create(dto: CreateJenisUsulanDto): Promise<JenisUsulan> {
        const ormEntity = plainToInstance(JenisUsulanOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateJenisUsulanDto): Promise<JenisUsulan> {
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

    async findById(id: number): Promise<JenisUsulan | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findByJenis(jenis: string): Promise<JenisUsulan | null> {
        const entity = await this.repo.findOne({ where: { jenis } });
        return entity || null;
    }

    async findAll(dto: GetJenisUsulanDto): Promise<{ data: JenisUsulan[]; total: number }> {
        const findOptions: any = {
            order: { id: 'DESC' },
        };

        if (dto.page !== undefined && dto.amount !== undefined) {
            findOptions.skip = (dto.page - 1) * dto.amount;
            findOptions.take = dto.amount;
        }

        const [data, total] = await this.repo.findAndCount(findOptions);

        return { data, total };
    }
}
