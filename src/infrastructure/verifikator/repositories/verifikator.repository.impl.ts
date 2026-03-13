import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerifikatorRepository } from '../../../domain/verifikator/verifikator.repository';
import { Verifikator } from '../../../domain/verifikator/verifikator.entity';
import { VerifikatorOrmEntity } from '../orm/verifikator.orm_entity';

@Injectable()
export class VerifikatorRepositoryImpl implements VerifikatorRepository {
    constructor(
        @InjectRepository(VerifikatorOrmEntity)
        private readonly repo: Repository<VerifikatorOrmEntity>
    ) { }

    async create(verifikator: Verifikator): Promise<Verifikator> {
        try {
            const entity = this.repo.create(verifikator);
            return await this.repo.save(entity);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, verifikator: Partial<Verifikator>): Promise<Verifikator> {
        try {
            await this.repo.update(id, verifikator);
            const updated = await this.findById(id);
            if (!updated) {
                throw new NotFoundException('Verifikator not found');
            }
            return updated;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const result = await this.repo.softDelete(id);
            return result.affected ? result.affected > 0 : false;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Verifikator | null> {
        try {
            const entity = await this.repo.findOne({
                where: { id },
                relations: ['user']
            });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByUserId(userId: number): Promise<Verifikator | null> {
        try {
            const entity = await this.repo.findOne({
                where: { idUser: userId },
                relations: ['user']
            });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(page: number, limit: number): Promise<{ data: Verifikator[]; total: number }> {
        try {
            const [data, total] = await this.repo.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                order: { id: 'DESC' },
                relations: ['user']
            });

            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async checkVerifikatorType(userId: number): Promise<string | null> {
        try {
            const result = await this.repo.findOne({
                where: { idUser: userId },
                select: ['jenisVerifikator']
            });
            return result ? result.jenisVerifikator : null;
        } catch (error) {
            throw error;
        }
    }
}
