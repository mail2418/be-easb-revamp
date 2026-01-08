import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AsbJakonOrmEntity } from '../../asb_jakon/orm/asb_jakon.orm_entity';
import { AsbJakonRepository } from '../../../domain/asb_jakon/asb_jakon.repository';
import { AsbJakon } from '../../../domain/asb_jakon/asb_jakon.entity';
import { plainToInstance } from 'class-transformer';
import { CreateAsbJakonDto } from 'src/presentation/asb_jakon/dto/create_asb_jakon.dto';
import { UpdateAsbJakonDto } from 'src/presentation/asb_jakon/dto/update_asb_jakon.dto';
import { DeleteAsbJakonDto } from 'src/presentation/asb_jakon/dto/delete_asb_jakon.dto';
import { GetAsbJakonListDto } from 'src/presentation/asb_jakon/dto/get_asb_jakon_list.dto';
import { GetAsbJakonDetailDto } from 'src/presentation/asb_jakon/dto/get_asb_jakon_detail.dto';
import { AsbJakonType } from 'src/domain/asb_jakon/asb_jakon_type.enum';
import { Injectable } from '@nestjs/common';
import { GetJakonByPriceRangeDto } from 'src/application/asb_jakon/dto/get_jakon_by_price_range.dto';
import { BulkCreateAsbJakonDto } from 'src/application/asb_jakon/dto/bulk_create_asb_jakon.dto';

@Injectable()
export class AsbJakonRepositoryImpl implements AsbJakonRepository {
    constructor(
        @InjectRepository(AsbJakonOrmEntity)
        private readonly repo: Repository<AsbJakonOrmEntity>,
    ) { }

    async create(dto: CreateAsbJakonDto): Promise<AsbJakon> {
        const entity = this.repo.create(dto);
        const saved = await this.repo.save(entity);
        return saved;
    }

    async update(id: number, dto: UpdateAsbJakonDto): Promise<AsbJakon> {
        await this.repo.update(id, dto);
        const updated = await this.repo.findOneBy({ id });
        return updated!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id)
            .then(() => true)
            .catch(() => false);
    }

    async findById(id: number): Promise<AsbJakon | null> {
        const entity = await this.repo
            .createQueryBuilder('asb_jakon')
            .select([
                'asb_jakon.id',
                'asb_jakon.id_asb_tipe_bangunan',
                'asb_jakon.id_asb_jenis',
                'asb_jakon.id_asb_klasifikasi',
                'asb_jakon.tahun',
                'asb_jakon.type',
                'asb_jakon.nama',
                'asb_jakon.spec',
                'asb_jakon.price_from',
                'asb_jakon.price_to',
                'asb_jakon.satuan',
                'asb_jakon.standard'
            ])
            .leftJoinAndSelect('asb_jakon.asbTipeBangunan', 'asb_tipe_bangunan')
            .leftJoinAndSelect('asb_jakon.asbJenis', 'asb_jenis')
            .leftJoinAndSelect('asb_jakon.asbKlasifikasi', 'asb_klasifikasi')
            .where('asb_jakon.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findAll(pagination: GetAsbJakonListDto): Promise<{ data: AsbJakon[]; total: number }> {
        const page = pagination.page ?? 1;
        const amount = pagination.amount ?? 10;
        const queryBuilder = this.repo
            .createQueryBuilder('asb_jakon')
            .select([
                'asb_jakon.id',
                'asb_jakon.id_asb_tipe_bangunan',
                'asb_jakon.id_asb_jenis',
                'asb_jakon.id_asb_klasifikasi',
                'asb_jakon.tahun',
                'asb_jakon.type',
                'asb_jakon.nama',
                'asb_jakon.spec',
                'asb_jakon.price_from',
                'asb_jakon.price_to',
                'asb_jakon.satuan',
                'asb_jakon.standard'
            ])
            .leftJoinAndSelect('asb_jakon.asbTipeBangunan', 'asb_tipe_bangunan')
            .leftJoinAndSelect('asb_jakon.asbJenis', 'asb_jenis')
            .leftJoinAndSelect('asb_jakon.asbKlasifikasi', 'asb_klasifikasi')
            .orderBy('asb_jakon.id', 'DESC')
            .skip((page - 1) * amount)
            .take(amount);
        const [data, total] = await queryBuilder.getManyAndCount();
        return { data, total };
    }

    async findByAsbJenisId(id: number): Promise<AsbJakon[]> {
        const data = await this.repo.find({ where: { idAsbJenis: id } });
        return data;
    }

    async findByAsbTipeBangunanId(id: number): Promise<AsbJakon[]> {
        const data = await this.repo.find({ where: { idAsbTipeBangunan: id } });
        return data || null;
    }

    async findByAsbKlasifikasiId(id: number): Promise<AsbJakon[]> {
        const data = await this.repo.find({ where: { idAsbKlasifikasi: id } });
        return data || null;
    }

    async findByTahun(tahun: number): Promise<AsbJakon[]> {
        const data = await this.repo.find({ where: { tahun } });
        return data || null;
    }

    async findByType(type: AsbJakonType): Promise<AsbJakon[]> {
        const data = await this.repo.find({ where: { type } });
        return data || null;
    }

    async findByPriceRange(dto: GetJakonByPriceRangeDto): Promise<AsbJakon | null> {
        let entity = await this.repo
            .createQueryBuilder('asb_jakon')
            .select(['asb_jakon.id', 'asb_jakon.standard', 'asb_jakon.price_from', 'asb_jakon.price_to'])
            .where('asb_jakon.id_asb_klasifikasi = :id_asb_klasifikasi', {
                id_asb_klasifikasi: dto.id_asb_klasifikasi
            })
            .andWhere('asb_jakon.id_asb_tipe_bangunan = :id_asb_tipe_bangunan', {
                id_asb_tipe_bangunan: dto.id_asb_tipe_bangunan
            })
            .andWhere('asb_jakon.id_asb_jenis = :id_asb_jenis', {
                id_asb_jenis: dto.id_asb_jenis
            })
            .andWhere('asb_jakon.type = :type', {
                type: dto.type
            })
            .andWhere('asb_jakon.price_from <= :total_biaya', {
                total_biaya: dto.total_biaya_pembangunan
            })
            .andWhere('asb_jakon.price_to > :total_biaya', {
                total_biaya: dto.total_biaya_pembangunan
            })
            .getOne();

        if (!entity) {
            entity = await this.repo
                .createQueryBuilder('asb_jakon')
                .select(['asb_jakon.id', 'asb_jakon.standard', 'asb_jakon.price_from', 'asb_jakon.price_to'])
                .where('asb_jakon.id_asb_klasifikasi = :id_asb_klasifikasi', {
                    id_asb_klasifikasi: dto.id_asb_klasifikasi
                })
                .andWhere('asb_jakon.id_asb_tipe_bangunan = :id_asb_tipe_bangunan', {
                    id_asb_tipe_bangunan: dto.id_asb_tipe_bangunan
                })
                .andWhere('asb_jakon.id_asb_jenis = :id_asb_jenis', {
                    id_asb_jenis: dto.id_asb_jenis
                })
                .andWhere('asb_jakon.type = :type', {
                    type: dto.type
                })
                .orderBy('asb_jakon.price_from', 'ASC')
                .getOne();
        }

        return entity || null;
    }

    async bulkCreate(dtos: BulkCreateAsbJakonDto[]): Promise<AsbJakon[]> {
        const ormEntities = dtos.map(dto => plainToInstance(AsbJakonOrmEntity, dto));
        const savedEntities = await this.repo.save(ormEntities);
        return savedEntities;
    }
}
