import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KecamatanRepository } from '../../../domain/kecamatan/kecamatan.repository';
import { Kecamatan } from '../../../domain/kecamatan/kecamatan.entity';
import { KecamatanOrmEntity } from '../orm/kecamatan.orm_entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class KecamatanRepositoryImpl implements KecamatanRepository {
    constructor(
        @InjectRepository(KecamatanOrmEntity) private readonly repo: Repository<KecamatanOrmEntity>,
    ) {}

    async create(kecamatan: Partial<Kecamatan>): Promise<Kecamatan> {
        const kecamatanOrm = this.repo.create(kecamatan);
        const newKecamatan = await this.repo.save(kecamatanOrm);
        return newKecamatan;
    }

    async update(id: number, kecamatan: Partial<Kecamatan>): Promise<Kecamatan> {
        await this.repo.update(id, kecamatan);
        const updatedKecamatan = await this.repo.findOne({ where: { id } });
        return updatedKecamatan!;
    }

    async delete(id: number): Promise<void> {
        await this.repo.softDelete(id);
    }

    async findById(id: number): Promise<Kecamatan | null> {
        const kecamatan = await this.repo
            .createQueryBuilder('kecamatan')
            .select(['kecamatan.id', 'kecamatan.nama_kecamatan', 'kecamatan.id_kabkota'])
            .where('kecamatan.id = :id', { id })
            .getOne();
        return kecamatan || null;
    }

    async findAll(
        page: number | undefined,
        amount: number | undefined,
        filter?: any,
    ): Promise<{ data: Kecamatan[]; total: number }> {
        const queryBuilder = this.repo.createQueryBuilder('kecamatan');

        if (filter?.idKabkota) {
            queryBuilder.andWhere('kecamatan.id_kabkota = :idKabkota', {
                idKabkota: filter.idKabkota,
            });
        }

        if (filter?.search) {
            queryBuilder.andWhere(
                '(kecamatan.nama_kecamatan ILIKE :search OR kecamatan.kode_kecamatan ILIKE :search)',
                { search: `%${filter.search}%` },
            );
        }

        if (page !== undefined && amount !== undefined) {
            queryBuilder.skip((page - 1) * amount).take(amount);
        }

        const [data, total] = await queryBuilder
            .orderBy('kecamatan.nama_kecamatan', 'ASC')
            .getManyAndCount();

        return { data, total };
    }

    async findByKabkotaId(idKabkota: number): Promise<Kecamatan[]> {
        const kecamatans = await this.repo.find({
            where: { idKabkota },
            order: { namaKecamatan: 'ASC' },
        });
        return kecamatans;
    }
}
