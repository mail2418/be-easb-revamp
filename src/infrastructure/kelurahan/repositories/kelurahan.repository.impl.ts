import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KelurahanRepository } from '../../../domain/kelurahan/kelurahan.repository';
import { Kelurahan } from '../../../domain/kelurahan/kelurahan.entity';
import { KelurahanOrmEntity } from '../orm/kelurahan.orm_entity';

@Injectable()
export class KelurahanRepositoryImpl implements KelurahanRepository {
    constructor(@InjectRepository(KelurahanOrmEntity) private readonly repo: Repository<KelurahanOrmEntity>) { }

    async create(kelurahan: Partial<Kelurahan>): Promise<Kelurahan> {
        try {
            const kelurahanOrm = this.repo.create(kelurahan);
            const newKelurahan = await this.repo.save(kelurahanOrm);
            return newKelurahan;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, kelurahan: Partial<Kelurahan>): Promise<Kelurahan> {
        try {
            await this.repo.update(id, kelurahan);
            const updatedKelurahan = await this.repo.findOne({ where: { id } });
            return updatedKelurahan!;
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

    async findById(id: number): Promise<Kelurahan | null> {
        try {
            const kelurahan = await this.repo.findOne({ where: { id } });
            return kelurahan || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(page: number, amount: number, filter?: any): Promise<{ data: Kelurahan[]; total: number }> {
        try {
            const queryBuilder = this.repo.createQueryBuilder('kelurahan');

            if (filter?.idKecamatan) {
                queryBuilder.andWhere('kelurahan.id_kecamatan = :idKecamatan', { idKecamatan: filter.idKecamatan });
            }

            if (filter?.search) {
                queryBuilder.andWhere('kelurahan.nama_kelurahan ILIKE :search', { search: `%${filter.search}%` });
            }

            const [data, total] = await queryBuilder
                .skip((page - 1) * amount)
                .take(amount)
                .orderBy('kelurahan.nama_kelurahan', 'ASC')
                .getManyAndCount();

            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async findByKecamatanId(idKecamatan: number): Promise<Kelurahan[]> {
        try {
            const kelurahans = await this.repo.find({
                where: { idKecamatan },
                order: { namaKelurahan: 'ASC' }
            });
            return kelurahans;
        } catch (error) {
            throw error;
        }
    }
}
