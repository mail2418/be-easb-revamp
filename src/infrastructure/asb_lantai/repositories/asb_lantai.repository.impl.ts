import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsbLantaiRepository } from '../../../domain/asb_lantai/asb_lantai.repository';
import { AsbLantai } from '../../../domain/asb_lantai/asb_lantai.entity';
import { AsbLantaiOrmEntity } from '../orm/asb_lantai.orm_entity';
import { CreateAsbLantaiDto } from '../../../presentation/asb_lantai/dto/create_asb_lantai.dto';
import { UpdateAsbLantaiDto } from '../../../presentation/asb_lantai/dto/update_asb_lantai.dto';
import { GetAsbLantaisDto } from '../../../presentation/asb_lantai/dto/get_asb_lantais.dto';
import { plainToInstance } from 'class-transformer';
import { AsbLantaiPaginationResultDto } from 'src/presentation/asb_lantai/dto/asb_lantai_pagination_result.dto';
import { applyIlikeSearch } from 'src/common/utils/search_query.util';

@Injectable()
export class AsbLantaiRepositoryImpl implements AsbLantaiRepository {
    constructor(@InjectRepository(AsbLantaiOrmEntity) private readonly repo: Repository<AsbLantaiOrmEntity>) { }

    async create(dto: CreateAsbLantaiDto): Promise<AsbLantai> {
        try {
            const newEntity = await this.repo.save({
                lantai: dto.lantai,
                type: dto.type,
                koef: dto.koef,
                idSatuan: dto.id_satuan,
            });
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbLantaiDto): Promise<AsbLantai> {
        try {
            const { id, id_satuan, ...rest } = dto;
            await this.repo.update(id, { ...rest, idSatuan: id_satuan });
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

    async findById(id: number): Promise<AsbLantai | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbLantaisDto): Promise<AsbLantaiPaginationResultDto> {
        try {
            const qb = this.repo.createQueryBuilder('asb_lantai');

            applyIlikeSearch(qb, 'asb_lantai', ['lantai'], pagination.search);

            const [data, total] = await qb
                .orderBy('asb_lantai.id', 'DESC')
                .skip((pagination.page - 1) * pagination.amount)
                .take(pagination.amount)
                .getManyAndCount();

            return {
                data,
                total,
                page: pagination.page,
                limit: pagination.amount,
                totalPages: Math.ceil(total / pagination.amount)
            }
        } catch (error) {
            throw error;
        }
    }

    async findByLantai(lantai: string): Promise<AsbLantai | null> {
        try {
            const entity = await this.repo.findOne({ where: { lantai } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}
