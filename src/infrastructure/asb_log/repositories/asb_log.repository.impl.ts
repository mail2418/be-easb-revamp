import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbLog } from '../../../domain/asb_log/asb_log.entity';
import { AsbLogRepository } from '../../../domain/asb_log/asb_log.repository';
import { AsbLogOrmEntity } from '../orm/asb_log.orm_entity';

@Injectable()
export class AsbLogRepositoryImpl extends AsbLogRepository {
    constructor(
        @InjectRepository(AsbLogOrmEntity)
        private readonly repository: Repository<AsbLogOrmEntity>,
    ) {
        super();
    }

    async create(log: string, idUser: number): Promise<AsbLog> {
        try {
            const ormEntity = this.repository.create({
                log,
                idUser,
            });

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbLog, saved);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbLog | null> {
        try {
            const entity = await this.repository.findOne({ where: { id } });
            return entity ? plainToInstance(AsbLog, entity) : null;
        } catch (error) {
            throw error;
        }
    }

    async findByUser(
        idUser: number,
        page: number,
        amount: number,
    ): Promise<[AsbLog[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idUser },
                order: { createdAt: 'DESC' },
                skip: (page - 1) * amount,
                take: amount,
            });

            const domainEntities = entities.map((e) =>
                plainToInstance(AsbLog, e),
            );
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async findByAsb(
        idAsb: number,
        page: number,
        amount: number,
    ): Promise<[AsbLog[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idAsb },
                order: { createdAt: 'DESC' },
                skip: (page - 1) * amount,
                take: amount,
            });

            const domainEntities = entities.map((e) =>
                plainToInstance(AsbLog, e),
            );
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async findAll(
        page: number,
        amount: number,
    ): Promise<[AsbLog[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                order: { createdAt: 'DESC' },
                skip: (page - 1) * amount,
                take: amount,
            });

            const domainEntities = entities.map((e) =>
                plainToInstance(AsbLog, e),
            );
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async findRecent(limit: number): Promise<AsbLog[]> {
        try {
            const entities = await this.repository.find({
                order: { createdAt: 'DESC' },
                take: limit,
            });

            return entities.map((e) => plainToInstance(AsbLog, e));
        } catch (error) {
            throw error;
        }
    }
}
