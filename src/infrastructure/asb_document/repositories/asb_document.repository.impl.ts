import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbDocument } from '../../../domain/asb_document/asb_document.entity';
import { AsbDocumentRepository } from '../../../domain/asb_document/asb_document.repository';
import { AsbDocumentOrmEntity } from '../orm/asb_document.orm_entity';
import { DocumentSpec } from '../../../domain/asb_document/document_spec.enum';

@Injectable()
export class AsbDocumentRepositoryImpl extends AsbDocumentRepository {
    constructor(
        @InjectRepository(AsbDocumentOrmEntity)
        private readonly repository: Repository<AsbDocumentOrmEntity>,
    ) {
        super();
    }

    async create(idAsb: number, spec: DocumentSpec, filename: string): Promise<AsbDocument> {
        try {
            const ormEntity = this.repository.create({
                idAsb,
                spec,
                filename,
            });

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbDocument, saved);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) {
                throw new Error(`AsbDocument with id ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async findBySpec(spec: DocumentSpec, idOpd?: number | null): Promise<AsbDocument[]> {
        try {
            const queryBuilder = this.repository
                .createQueryBuilder('document')
                .leftJoinAndSelect('document.asb', 'asb')
                .where('document.spec = :spec', { spec });

            // If idOpd is provided, filter by OPD
            if (idOpd !== null && idOpd !== undefined) {
                queryBuilder.andWhere('asb.id_opd = :idOpd', { idOpd });
            }

            const entities = await queryBuilder.getMany();
            return entities.map((e) => plainToInstance(AsbDocument, e));
        } catch (error) {
            throw error;
        }
    }

    async findByAsb(idAsb: number, page: number, amount: number, idOpd?: number | null): Promise<[AsbDocument[], number]> {
        try {
            const queryBuilder = this.repository
                .createQueryBuilder('document')
                .leftJoinAndSelect('document.asb', 'asb')
                .where('document.id_asb = :idAsb', { idAsb });

            // If idOpd is provided, filter by OPD
            if (idOpd !== null && idOpd !== undefined) {
                queryBuilder.andWhere('asb.id_opd = :idOpd', { idOpd });
            }

            const [entities, total] = await queryBuilder
                .skip((page - 1) * amount)
                .take(amount)
                .orderBy('document.id', 'DESC')
                .getManyAndCount();

            const domainEntities = entities.map((e) => plainToInstance(AsbDocument, e));
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async findByAsbIdAll(idAsb: number, idOpd?: number | null): Promise<AsbDocument[]> {
        try {
            const queryBuilder = this.repository
                .createQueryBuilder('document')
                .leftJoinAndSelect('document.asb', 'asb')
                .where('document.id_asb = :idAsb', { idAsb });

            // If idOpd is provided, filter by OPD
            if (idOpd !== null && idOpd !== undefined) {
                queryBuilder.andWhere('asb.id_opd = :idOpd', { idOpd });
            }

            const entities = await queryBuilder.getMany();
            return entities.map((e) => plainToInstance(AsbDocument, e));
        } catch (error) {
            throw error;
        }
    }
}
