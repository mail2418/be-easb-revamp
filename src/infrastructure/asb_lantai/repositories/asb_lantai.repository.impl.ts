import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AsbLantaiRepository } from '../../../domain/asb_lantai/asb_lantai.repository';
import { AsbLantai } from '../../../domain/asb_lantai/asb_lantai.entity';
import { AsbLantaiOrmEntity } from '../orm/asb_lantai.orm_entity';
import { CreateAsbLantaiDto } from '../../../presentation/asb_lantai/dto/create_asb_lantai.dto';
import { UpdateAsbLantaiDto } from '../../../presentation/asb_lantai/dto/update_asb_lantai.dto';
import { GetAsbLantaisDto } from '../../../presentation/asb_lantai/dto/get_asb_lantais.dto';
import { plainToInstance } from 'class-transformer';
import { AsbLantaiPaginationResultDto } from 'src/presentation/asb_lantai/dto/asb_lantai_pagination_result.dto';

@Injectable()
export class AsbLantaiRepositoryImpl implements AsbLantaiRepository {
    constructor(@InjectRepository(AsbLantaiOrmEntity) private readonly repo: Repository<AsbLantaiOrmEntity>) { }

    async create(dto: CreateAsbLantaiDto): Promise<AsbLantai> {
        const ormEntity = this.repo.create({
            lantai: dto.lantai,
            type: dto.type,
            koef: dto.koef,
            idSatuan: dto.id_satuan,
        });
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateAsbLantaiDto): Promise<AsbLantai> {
        const updateData: Partial<AsbLantaiOrmEntity> = {
            lantai: dto.lantai,
            type: dto.type,
            koef: dto.koef,
            idSatuan: dto.id_satuan,
        };
        await this.repo.update(dto.id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id: dto.id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<AsbLantai | null> {
        const entity = await this.repo
            .createQueryBuilder('asb_lantai')
            .select(['asb_lantai.id', 'asb_lantai.lantai', 'asb_lantai.koef'])
            .where('asb_lantai.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findAll(pagination: GetAsbLantaisDto): Promise<AsbLantaiPaginationResultDto> {
        const findOptions: any = {
            order: { id: 'DESC' }
        };

        if (pagination.search) {
            const q = ILike(`%${pagination.search}%`);
            findOptions.where = [{ lantai: q }, { type: q }];
        }

        if (pagination.page !== undefined && pagination.amount !== undefined) {
            findOptions.skip = (pagination.page - 1) * pagination.amount;
            findOptions.take = pagination.amount;
        }

        const [data, total] = await this.repo.findAndCount(findOptions);

        return {
            data,
            total,
            page: pagination.page ?? 1,
            limit: pagination.amount ?? total,
            totalPages: pagination.amount ? Math.ceil(total / pagination.amount) : 1
        }
    }

    async findByLantai(lantai: string): Promise<AsbLantai | null> {
        const entity = await this.repo.findOne({ where: { lantai } });
        return entity || null;
    }
}
