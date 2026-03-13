import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KabKotaRepository } from '../../../domain/kabkota/kabkota.repository';
import { KabKota } from '../../../domain/kabkota/kabkota.entity';
import { KabKotaOrmEntity } from '../orm/kabkota.orm_entity';
import { CreateKabKotaDto } from 'src/presentation/kabkota/dto/create_kabkota.dto';
import { GetKabKotasDto } from 'src/presentation/kabkota/dto/get_kabkotas.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class KabKotaRepositoryImpl implements KabKotaRepository {
    constructor(@InjectRepository(KabKotaOrmEntity) private readonly repo: Repository<KabKotaOrmEntity>) {}

    async create(kabkota: CreateKabKotaDto): Promise<KabKota> {
        try {
            const kabkotaOrm = plainToInstance(KabKotaOrmEntity, kabkota);
            const newKabKota = await this.repo.save(kabkotaOrm);
            return newKabKota;
        } catch (error) {
            console.error('Error creating kabkota:', error);
            throw error;
        }
    }

    async update(id: number, data: Partial<KabKota>): Promise<KabKota> {
        try {
            await this.repo.update(id, data);
            const updatedKabKota = await this.repo.findOne({ where: { id } });
            return updatedKabKota!;
        } catch (error) {
            console.error('Error updating kabkota:', error);
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            return await this.repo.softDelete(id) .then(() => true).catch(() => false);
        } catch (error) {
            console.error('Error deleting kabkota:', error);
            throw error;
        }
    }

    async findById(id: number): Promise<KabKota | null> {
        try {
            const kabkota = await this.repo.findOne({ where: { id } });
            return kabkota || null;
        } catch (error) {
            console.error('Error finding kabkota by id:', error);
            throw error;
        }
    }

    async findByKode(kode: string): Promise<KabKota | null> {
        try {
            const kabkota = await this.repo.findOne({ where: { kode } });
            return kabkota || null;
        } catch (error) {
            console.error('Error finding kabkota by kode:', error);
            throw error;
        }
    }

    async findByProvinceId(provinceId: number): Promise<KabKota[]> {
        try {
            const kabkotas = await this.repo.find({
                where: { provinceId },
                order: { nama: 'ASC' }
            });
            return kabkotas;
        } catch (error) {
            console.error('Error finding kabkotas by province:', error);
            throw error;
        }
    }

    async findAll(pagination: GetKabKotasDto): Promise<{ data: KabKota[], total: number }> {
        try {
            const [kabkotas, total] = await this.repo.findAndCount({
                skip: (pagination.page - 1) * pagination.amount,
                take: pagination.amount,
                order: { id: 'DESC' }
            });

            return { data: kabkotas, total };
        } catch (error) {
            console.error('Error fetching kabkotas:', error);
            throw error;
        }
    }
}
