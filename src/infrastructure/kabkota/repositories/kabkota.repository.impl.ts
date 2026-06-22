import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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
        const kabkotaOrm = plainToInstance(KabKotaOrmEntity, kabkota);
        const newKabKota = await this.repo.save(kabkotaOrm);
        return newKabKota;
    }

    async update(id: number, data: Partial<KabKota>): Promise<KabKota> {
        await this.repo.update(id, data);
        const updatedKabKota = await this.repo.findOne({ where: { id } });
        return updatedKabKota!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id) .then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<KabKota | null> {
        const kabkota = await this.repo
            .createQueryBuilder('kabkota')
            .select(['kabkota.id', 'kabkota.nama', 'kabkota.id_provinsi'])
            .where('kabkota.id = :id', { id })
            .getOne();
        return kabkota || null;
    }

    async findByKode(kode: string): Promise<KabKota | null> {
        const kabkota = await this.repo.findOne({ where: { kode } });
        return kabkota || null;
    }

    async findByNama(nama: string): Promise<KabKota | null> {
        const kabkota = await this.repo.findOne({ where: { nama } });
        return kabkota || null;
    }

    async findByProvinceId(provinceId: number): Promise<KabKota[]> {
        const kabkotas = await this.repo.find({
            where: { provinceId },
            order: { nama: 'ASC' }
        });
        return kabkotas;
    }

    async findAll(pagination: GetKabKotasDto): Promise<{ data: KabKota[], total: number }> {
        const findOptions: any = {
            order: { id: 'DESC' }
        };

        if (pagination.search) {
            const q = ILike(`%${pagination.search}%`);
            findOptions.where = [{ nama: q }, { kode: q }];
        }

        if (pagination.page !== undefined && pagination.amount !== undefined) {
            findOptions.skip = (pagination.page - 1) * pagination.amount;
            findOptions.take = pagination.amount;
        }

        const [kabkotas, total] = await this.repo.findAndCount(findOptions);

        return { data: kabkotas, total };
    }
}
