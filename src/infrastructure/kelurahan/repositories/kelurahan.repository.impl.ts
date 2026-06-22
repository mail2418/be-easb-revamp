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
        const kelurahanOrm = this.repo.create(kelurahan);
        const newKelurahan = await this.repo.save(kelurahanOrm);
        return newKelurahan;
    }

    async update(id: number, kelurahan: Partial<Kelurahan>): Promise<Kelurahan> {
        await this.repo.update(id, kelurahan);
        const updatedKelurahan = await this.repo.findOne({ where: { id } });
        return updatedKelurahan!;
    }

    async delete(id: number): Promise<void> {
        await this.repo.softDelete(id);
    }

    async findById(id: number): Promise<Kelurahan | null> {
        const kelurahan = await this.repo
            .createQueryBuilder('kelurahan')
            .select(['kelurahan.id', 'kelurahan.nama_kelurahan', 'kelurahan.id_kecamatan'])
            .where('kelurahan.id = :id', { id })
            .getOne();
        return kelurahan || null;
    }

    async findAll(page: number | undefined, amount: number | undefined, filter?: any): Promise<{ data: Kelurahan[]; total: number }> {
        const queryBuilder = this.repo.createQueryBuilder('kelurahan');

        if (filter?.idKecamatan) {
            queryBuilder.andWhere('kelurahan.id_kecamatan = :idKecamatan', { idKecamatan: filter.idKecamatan });
        }

        if (filter?.search) {
            queryBuilder.andWhere('kelurahan.nama_kelurahan ILIKE :search', { search: `%${filter.search}%` });
        }

        if (page !== undefined && amount !== undefined) {
            queryBuilder.skip((page - 1) * amount).take(amount);
        }

        const [data, total] = await queryBuilder
            .orderBy('kelurahan.nama_kelurahan', 'ASC')
            .getManyAndCount();

        return { data, total };
    }

    async findByKecamatanId(idKecamatan: number): Promise<Kelurahan[]> {
        const kelurahans = await this.repo.find({
            where: { idKecamatan },
            order: { namaKelurahan: 'ASC' }
        });
        return kelurahans;
    }
}
