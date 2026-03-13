import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KecamatanRepository } from '../../../domain/kecamatan/kecamatan.repository';
import { Kecamatan } from '../../../domain/kecamatan/kecamatan.entity';
import { KecamatanOrmEntity } from '../orm/kecamatan.orm_entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class KecamatanRepositoryImpl implements KecamatanRepository {
    constructor(@InjectRepository(KecamatanOrmEntity) private readonly repo: Repository<KecamatanOrmEntity>) { }

    async create(kecamatan: Partial<Kecamatan>): Promise<Kecamatan> {
        try {
            const kecamatanOrm = this.repo.create(kecamatan);
            const newKecamatan = await this.repo.save(kecamatanOrm);
            return newKecamatan;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, kecamatan: Partial<Kecamatan>): Promise<Kecamatan> {
        try {
            await this.repo.update(id, kecamatan);
            const updatedKecamatan = await this.repo.findOne({ where: { id } });
            return updatedKecamatan!;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.repo.softDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Kecamatan | null> {
        try {
            const kecamatan = await this.repo.findOne({ where: { id } });
            return kecamatan || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(page: number, amount: number, filter?: any): Promise<{ data: Kecamatan[]; total: number }> {
        try {
            const queryBuilder = this.repo.createQueryBuilder('kecamatan');

            if (filter?.idKabkota) {
                queryBuilder.andWhere('kecamatan.id_kabkota = :idKabkota', { idKabkota: filter.idKabkota });
            }

            if (filter?.search) {
                queryBuilder.andWhere(
                    '(kecamatan.nama_kecamatan ILIKE :search OR kecamatan.kode_kecamatan ILIKE :search)',
                    { search: `%${filter.search}%` }
                );
            }

            const [data, total] = await queryBuilder
                .skip((page - 1) * amount)
                .take(amount)
                .orderBy('kecamatan.nama_kecamatan', 'ASC')
                .getManyAndCount();

            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async findByKabkotaId(idKabkota: number): Promise<Kecamatan[]> {
        try {
            const kecamatans = await this.repo.find({
                where: { idKabkota },
                order: { namaKecamatan: 'ASC' }
            });
            return kecamatans;
        } catch (error) {
            throw error;
        }
    }
}
