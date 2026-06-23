import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RekeningRepository } from '../../../domain/rekening/rekening.repository';
import { Rekening } from '../../../domain/rekening/rekening.entity';
import { RekeningOrmEntity } from '../orm/rekening.orm_entity';
import { CreateRekeningDto } from '../../../presentation/rekening/dto/create_rekening.dto';
import { UpdateRekeningDto } from '../../../presentation/rekening/dto/update_rekening.dto';
import { GetRekeningsDto } from '../../../presentation/rekening/dto/get_rekenings.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RekeningRepositoryImpl implements RekeningRepository {
    constructor(
        @InjectRepository(RekeningOrmEntity) private readonly repo: Repository<RekeningOrmEntity>,
    ) {}

    async create(rekening: CreateRekeningDto): Promise<Rekening> {
        const ormEntity = plainToInstance(RekeningOrmEntity, {
            ...rekening,
            idJenisUsulan: rekening.id_jenis_usulan ?? null,
        });
        const newEntity = await this.repo.save(ormEntity);
        // Reload with relation
        const entityWithRelation = await this.repo
            .createQueryBuilder('rekening')
            .leftJoinAndSelect('rekening.jenisUsulan', 'jenisUsulan')
            .where('rekening.id = :id', { id: newEntity.id })
            .getOne();
        return entityWithRelation!;
    }

    async update(id: number, rekening: UpdateRekeningDto): Promise<Rekening> {
        const updateData: Partial<RekeningOrmEntity> = {
            rekening_kode: rekening.rekening_kode,
            rekening_uraian: rekening.rekening_uraian,
            bulan: rekening.bulan,
            tahun: rekening.tahun,
            idJenisUsulan: rekening.id_jenis_usulan ?? null,
        };
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo
            .createQueryBuilder('rekening')
            .leftJoinAndSelect('rekening.jenisUsulan', 'jenisUsulan')
            .where('rekening.id = :id', { id })
            .getOne();
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo
            .softDelete(id)
            .then(() => true)
            .catch(() => false);
    }

    async findById(id: number): Promise<Rekening | null> {
        const entity = await this.repo
            .createQueryBuilder('rekening')
            .leftJoinAndSelect('rekening.jenisUsulan', 'jenisUsulan')
            .where('rekening.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findByKode(rekeningKode: string): Promise<Rekening | null> {
        const entity = await this.repo
            .createQueryBuilder('rekening')
            .leftJoinAndSelect('rekening.jenisUsulan', 'jenisUsulan')
            .where('rekening.rekening_kode LIKE :rekeningKode', {
                rekeningKode: `%${rekeningKode}%`,
            })
            .getOne();
        return entity || null;
    }

    async findAll(pagination: GetRekeningsDto): Promise<{ data: Rekening[]; total: number }> {
        const queryBuilder = this.repo
            .createQueryBuilder('rekening')
            .leftJoinAndSelect('rekening.jenisUsulan', 'jenisUsulan');

        // Filter by id_jenis_usulan if provided
        if (pagination.id_jenis_usulan !== undefined) {
            queryBuilder.andWhere('rekening.id_jenis_usulan = :id_jenis_usulan', {
                id_jenis_usulan: pagination.id_jenis_usulan,
            });
        }

        if (pagination.search) {
            queryBuilder.andWhere(
                '(rekening.rekening_kode ILIKE :search OR rekening.rekening_uraian ILIKE :search)',
                { search: `%${pagination.search}%` },
            );
        }

        queryBuilder.orderBy('rekening.id', 'DESC');

        // Apply pagination
        if (pagination.page !== undefined && pagination.amount !== undefined) {
            queryBuilder.skip((pagination.page - 1) * pagination.amount);
            queryBuilder.take(pagination.amount);
        }

        const [data, total] = await queryBuilder.getManyAndCount();

        return { data, total };
    }
}
