import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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
        const entity = this.repo.create(verifikator);
        return await this.repo.save(entity);
    }

    async update(id: number, verifikator: Partial<Verifikator>): Promise<Verifikator> {
        await this.repo.update(id, verifikator);
        const updated = await this.findById(id);
        if (!updated) {
            throw new NotFoundException('Verifikator not found');
        }
        return updated;
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repo.softDelete(id);
        return result.affected ? result.affected > 0 : false;
    }

    async findById(id: number): Promise<Verifikator | null> {
        const entity = await this.repo.findOne({
            where: { id },
            relations: ['user']
        });
        return entity || null;
    }

    async findByUserId(userId: number): Promise<Verifikator | null> {
        const entity = await this.repo.findOne({
            where: { idUser: userId },
            relations: ['user']
        });
        return entity || null;
    }

    async findAll(page?: number, amount?: number, search?: string): Promise<{ data: Verifikator[]; total: number }> {
        const safePage = Math.max(page ?? 1, 1);
        const safeAmount = Math.max(amount ?? 10, 1); // default 10 items

        const skip = (safePage - 1) * safeAmount;

        const findOptions: any = {
            skip,
            take: safeAmount,
            order: { id: 'DESC' },
            relations: ['user'],
        };

        if (search) {
            const q = ILike(`%${search}%`);
            findOptions.where = [
                { verifikator: q },
                { user: { username: q } },
            ];
        }

        const [data, total] = await this.repo.findAndCount(findOptions);

        return { data, total };
    }


    async checkVerifikatorType(userId: number): Promise<string | null> {
        const result = await this.repo.findOne({
            where: { idUser: userId },
            select: ['jenisVerifikator']
        });
        return result ? result.jenisVerifikator : null;
    }
}
